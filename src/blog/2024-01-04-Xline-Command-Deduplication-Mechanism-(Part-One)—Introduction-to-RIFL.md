---
  cover: /xline-home/blog/Xline-Command-Deduplication-Mechanism-(Part-One)—Introduction-to-RIFL/cover.png
  author:
    name: Wenhui Tang
    url: https://github.com/iGxnon
    img_url: https://avatars.githubusercontent.com/u/59405399?v=4
  read_time: 20
---

In a system that receives external commands, it is common for a command to be executed at least once, which we refer to as at-least-once semantics. If a command fails, the system often implements a retry mechanism to attempt to resolve the issue. This raises a problem: repeated submission of the same command can impact the system's state.

---

## Why is deduplication of commands necessary?

In a system that receives external commands, it is common for a command to be executed at least once, which we refer to as at-least-once semantics. If a command fails, the system often implements a retry mechanism to attempt to resolve the issue. This raises a problem: repeated submission of the same command can impact the system's state.

For example, to achieve linearizable semantics (where each user operation appears to be executed immediately, exactly once, and at some point between its invocation and response), it's necessary to deduplicate commands. In Raft implementations without command deduplication, a command might be executed multiple times. The leader might crash after committing but before responding to the client, and if the client retries the same command with a new leader, the command could be executed twice.

There are two solutions to this problem: one is similar to the etcd approach, which distinguishes between commands that can be retried and commands that cannot be retried, and returns the error results of the commands that cannot be retried to the user, without providing any guarantees, even though the command may have already been executed by the system. Another option is to implement a command tracking mechanism that checks the commands executed in the system to realize command de-duplication. When the system implements this deduplication mechanism, it can realize exactly-once semantics of command execution, and thus realize a higher level of consistency assurance.

The implementation of retries in etcd's gRPC client interceptor:

```go
// unaryClientInterceptor returns a new retrying unary client interceptor.
//
// The default configuration of the interceptor is to not retry *at all*. This behaviour can be
// changed through options (e.g. WithMax) on creation of the interceptor or on call (through grpc.CallOptions).
func (c *Client) unaryClientInterceptor(optFuncs ...retryOption) grpc.UnaryClientInterceptor {
    intOpts := reuseOrNewWithCallOptions(defaultOptions, optFuncs)
    return func(ctx context.Context, method string, req, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
       ctx = withVersion(ctx)
       grpcOpts, retryOpts := filterCallOptions(opts)
       callOpts := reuseOrNewWithCallOptions(intOpts, retryOpts)
       ...
       var lastErr error
       for attempt := uint(0); attempt < callOpts.max; attempt++ {
          if err := waitRetryBackoff(ctx, attempt, callOpts); err != nil {
             return err
          }

          ...

          lastErr = invoker(ctx, method, req, reply, cc, grpcOpts...)
          if lastErr == nil {
             return nil
          }

          ...

          // Retry here
          if !isSafeRetry(c, lastErr, callOpts) {
             return lastErr
          }
       }
       return lastErr
    }
}
```

## At what stage is deduplication completed?

First, it's important to understand the purpose of deduplication: to prevent duplicate commands from affecting the state machine. There are two stages where commands can be deduplicated: upon receiving the command and when applying it to the state machine.

Regardless of the method, a data structure is needed to track the progress of received and executed commands for deduplicating incoming client commands.

Deduplicating commands at the stage of applying them to the state machine naturally involves using the backend storage of the state machine to retrieve previously executed commands (for example, Log::get_cmd_ids can retrieve all command IDs in the log). This set of command IDs can be used to deduplicate commands about to be applied to the state machine.

To deduplicate upon receiving a command, an additional data structure must be maintained, typically in memory for efficient read-write access. This structure should not occupy a significant amount of memory and may need a garbage collection mechanism.

For the first approach, a primary issue is that log compaction mechanisms can render the deduplication ineffective. In Raft systems, log compaction is implemented to prevent excessive memory usage by logs. If a command log has been compacted, deduplication for the repeated command becomes impossible. Secondly, duplicate commands still undergo preparation and speculative execution before being sent to the state machine, consuming additional CPU. Finally, accessing the state machine is costly, and this method of deduplication can significantly impact performance.

Therefore, it's more efficient to deduplicate commands upon receipt, rejecting duplicate command submissions as early as possible.

## Current Flaws in Command Deduplication Design

In Xline CURP, commands are implemented as a trait by external mechanisms. Unlike etcd, we do not differentiate the retry behavior of some commands, so we have not defined retry characteristics in the command trait.

Currently, the CURP client retries all commands, so a simple deduplication mechanism has been implemented in the curp server:

The CommandBoard contains an IndexSet<ProposeId> for recording the IDs of previously executed commands.

```rust
/// Command board is a buffer to track cmd states and store notifiers for requests that need to wait for a cmd
#[derive(Debug)]
pub(super) struct CommandBoard<C: Command> {
    ...
    /// The cmd has been received before, this is used for dedup
    pub(super) sync: IndexSet<ProposeId>,
    ...
}
```

Thus, we can deduplicate commands at the propose stage with an O(1) overhead.

```rust
pub(super) fn handle_propose(
        &self,
        cmd: Arc<C>,
    ) -> Result<((Option<ServerId>, u64), Result<bool, ProposeError>), CurpError> {
        ...
        if !self.ctx.cb.map_write(|mut cb_w| cb_w.sync.insert(id)) {
            return Ok((info, Err(ProposeError::Duplicated)));
        }
        ...
    }
```

To ensure that CURP does not lose the IDs of commands currently being executed during a leadership transfer, this structure is also restored in the recovery of the Speculative Pool.

```rust
/// Recover from all voter's spec pools
    fn recover_from_spec_pools(
        &self,
        st: &mut State,
        log: &mut Log<C>,
        spec_pools: HashMap<ServerId, Vec<PoolEntry<C>>>,
    ) {
        ...
        for cmd in recovered_cmds {
            let _ig_sync = cb_w.sync.insert(cmd.id()); // may have been inserted before
            ...
        }
    }
```

Finally, to prevent the IndexSet<ProposeId> from occupying too much memory, the GC mechanism mentioned in the Xline source code analysis article periodically clears this structure.

However, under extreme network conditions, if the interval between a client initiating a command and receiving a response exceeds the GC interval, the ProposeId recorded in the IndexSet might be cleared by GC. In such cases, if the client retries the command, the deduplication mechanism would fail. We observed this extreme scenario in madsim tests (due to madsim's clock running much faster than real time, this issue was triggered), necessitating a new deduplication structure to address the problem. The latter part of this article will introduce the working principle of RIFL (Reusable Infrastructure for Linearizability) and how it is applied in CURP.

## Introduction to RIFL

[RIFL (Reusable Infrastructure for Linearizability)](https://web.stanford.edu/~ouster/cgi-bin/papers/rifl.pdf) is an infrastructure designed to ensure exactly-once semantics for RPCs (remote procedure calls) in large-scale clusters. To align the terminology of RIFL with that of the Xline system, in this context, RPCs and Commands are synonymous.

## Overview of RIFL

In RIFL, each RPC is assigned a unique identifier, composed of a 64-bit client_id and a 64-bit incrementing sequence_number under this client_id.

A system-wide structure, typically a Lease Manager module in RIFL, generates the client_id. This module assigns a client_id to each client and creates a corresponding lease, which clients must continually keep alive. Servers need to check this lease to determine if a client has crashed.

Furthermore, RIFL requires persistent tracking and recording of completed RPCs. During system migrations, these completion records must also be transferred to ensure that RIFL maintains the non-repetition of RPCs during the migration process. RPCs that have been executed previously will directly retrieve their prior completion records.

Finally, RPC completion records should be cleared upon client confirmation (or after a client crash) to safely remove unnecessary storage.

## Specific Components and Functions of RIFL

The following are key components of RIFL and their corresponding functions:

1. Request Tracker (Client-Side): Tracks commands sent by the client.
   - newSequenceNum(): Generates an incrementing sequence number for an RPC.
   - firstIncomplete(): Retrieves the current smallest sequence number for which the RPC response has not been received.
   - rpcComplete(sequenceNumber): Marks the given sequenceNumber as received, which is later used to update firstIncomplete.
2. Lease Manager: A unified Lease Manager module where clients renew their client_id, and servers check the expiration of client_id leases.
   - getClientId(): Clients obtain their client_id, or request the lease server to create one if it doesn't exist.
   - checkAlive(clientId): Servers check whether the lease for a given client_id has expired to determine if the client is alive.
3. Result Tracker (Server-Side): Tracks received commands and the progress confirmed by the client.
   - checkDuplicate(clientId, sequenceNumber): Determines if an RPC is a duplicate based on completion records.
   - recordCompletion(clientId, sequenceNumber, completionRecord): Marks an RPC as executed and stores the completionRecord before returning to the client.
   - processAck(clientId, firstIncomplete): Recycles all completion records for RPCs preceding firstIncomplete for a client.

![图片](</xline-home/blog/Xline-Command-Deduplication-Mechanism-(Part-One)—Introduction-to-RIFL/image1.png>)

When a server receives an RPC (client_id, seq_num, first_incomplete), it checks the RPC's status using checkDuplicate:

1. NEW: A new RPC, processed according to standard logic.
2. COMPLETED: An already completed RPC, returning the completion record.
3. IN_PROGRESS: An RPC that is currently being executed, returning an IN_PROGRESS error.
4. STALE: An RPC that has been acknowledged and recycled by the client, returning a STALE error.

Additionally, the server uses the first_incomplete field from the incoming RPC to call processAck, recycling the completion records of acknowledged RPCs. Lastly, when an RPC is completed and before returning to the client, recordCompletion is called to persist the completion record and mark the RPC as COMPLETED.

Furthermore, the server checks if the client_id's lease is still valid to determine if a client is alive. If the lease has expired, all completion records under that client_id are recycled.

## Performance Analysis of RIFL

In the RIFL architecture, a noticeable overhead arises from the communication between clients and servers with the Lease Manager. The RIFL paper mentions that servers can cache the expiration time of a client_id lease and query the Lease Manager only as it nears expiration, reducing network communication.

In the aforementioned processes, either checkDuplicate or processAck involves at least one O(n) complexity operation (either checking duplicates in sequenceNumber order or filtering unordered sequenceNumbers but needing to traverse and filter those less than first_incomplete for processAck). Compared to the O(1) complexity of the previous IndexSet approach, RIFL incurs some additional overhead. Performance can be optimized by making processAck a separate RPC to notify the server to recycle completion records.

Finally, since the first mechanism for recycling only checks first_incomplete, it may encounter a long-running RPC that blocks the recycling of subsequent RPC completion records, potentially leading to excessive memory usage on the server. The RIFL paper suggests setting a maximum number of inflight RPCs for a client, refusing excess RPCs, and considering early recycling of subsequent RPC completion records, which could make RIFL more complex.

## Summary

The above describes the mechanism by which RIFL maintains exactly-once semantics for unary RPCs. Section 6 of the RIFL paper, titled "Implementing Transactions with RIFL," details the mechanism for maintaining exactly-once semantics for transactions involving multiple objects. However, as transactions in the Xline system are sent to the server as a single command, they do not require separate handling. Readers interested in this aspect can refer to the paper for more details, as it will not be elaborated upon here.

The first half of this article begins with the need for command deduplication and discusses the existing problems with the current deduplication mechanism in Xline. The latter half details the working principle of RIFL (Reusable Infrastructure for Linearizability) and provides a performance analysis. Future articles will continue to discuss how RIFL is applied in Xline, along with necessary modifications and optimizations made to RIFL.
