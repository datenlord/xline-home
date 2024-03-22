---
  cover: /xline-home/blog/Analysis-of-Xline-Jepsen-Tests/cover.png
  author:
    name: Zhenghao Yin
    url: https://github.com/bsbds
    img_url: https://avatars.githubusercontent.com/u/69835502?v=4
  read_time: 10
---

In this article, we will mainly introduce the application of Jepsen in the testing of a distributed KV storage Xline. This includes an introduction to the chaos engineering framework Jepsen, a explanation to consistency models, and an analysis of the testing results.

---

## Abstract

In this article, we will mainly introduce the application of Jepsen in the testing of a distributed KV storage Xline. This includes an introduction to the chaos engineering framework Jepsen, a explanation to consistency models, and an analysis of the testing results.

## Introduction

First, let’s get an overview of Xline and the Jepsen testing framework.

## Xline

[Xline](https://github.com/xline-kv/Xline) is a distributed key-value storage and it is currently a CNCF sandbox project. Similar to etcd, Xline provides a consistent key-value storage, as well as other functionalities such as watch and distributed locks.

Xline provides an etcd-compatible API, but its main difference from etcd lies in the consensus protocol.

Xline uses [CURP](https://www.usenix.org/system/files/nsdi19-park.pdf) as its consensus protocol, which allows it to achieve consensus within 1-RTT (Round Trip Time) in most cases, while Raft requires at least 2-RTT to achieve consensus. Therefore, Xline can achieve higher performance in high-latency environments.

## Jepsen

[Jepsen](https://github.com/jepsen-io/jepsen) is a framework for validating distributed systems, belonging to the field of chaos engineering. It provides consistency checks and fault injection capabilities. Specifically, Jepsen performs black-box testing, where it simulates complex real-world deployment environments and performs a series of operations on the database. After the testing is complete, it uses consistency checkers to verify whether the results comply with the consistency guarantees of the database.

## Checkers

Jepsen uses checkers to perform consistency checks on the execution results. Currently, Jepsen has two types of checkers: Knossos and Elle.

Knossos is used to check if the results are linearizable, and Elle is used to check the consistency of database transactions.

It is important to note that these checkers cannot guarantee the detection of all inconsistencies, as linearizability and serializability checkings are both NP-complete problems [1][2]. Jepsen’s checkers limit the scope of calculations to complete the testing within a shorter time frame.

## Nemesis

The fault injection component in Jepsen is called nemesis. Jepsen has some built-in nemesis options:

- kill, which can kill the processes of the database on certain nodes
- pause, which can pause the processes of the database on certain nodes
- partition, which creates network partitions between arbitrary two nodes, such as majority/minority partitions
- clock, which can skew the system clocks on certain nodes

These components can simulate common software and hardware faults in distributed system deployment environments. Additionally, Jepsen, being a highly flexible framework, allows users to customize their own nemesis. For example, for etcd, we can make membership changes in the cluster also be a nemesis, so that is can adds/deletes nodes in the testing. Therefore, nemesis can not only be used for fault injection but also to trigger some events that may occur in the system.

## Jepsen Testing Design

Next, I will provide a detailed analysis of the etcd Jepsen testing design and explain how we applied Jepsen testing on Xline.

## Data Consistency

First, let me briefly introduce three consistency models as the background for the following analysis. They are Serializability, Linearizability, and Strict Serializability. More detailed information about these consistency models can be found on the Jepsen official website [3].

## Serializability

Serializability is a transaction model that applies to multiple objects (e.g., multiple keys in etcd), where each transaction’s operations are atomic. It has several characteristics:

- Internal Consistency: A read operation in a transaction can observe the results of all previous write operations.
- External Consistency: A read in one transaction, denoted as T1, can observe a write in another transaction, denoted as T0. We call this T0 is visible to T1.
- Total Visibility: All visibility relationships form a total order. Which also means that there are some transactions that do not have this visibility relationship, applying this visibility relationship to all transactions forms a partial order.

## Linearizability

Linearizability applies to a single object, and each operation is also atomic. All operations appears in a real-time order, which means that the order of the operation results reflects the specific time of completion.

## Strict Serializability

Strict Serializability combines Serializability and Linearizability, achieving the strongest consistency guarantee. It can be viewed as Linearizability for multiple objects. At this point, we not only guarantee total visibility, but also requires that all transactions appears in a real-time order.

## Jepsen etcd Test

First, let me briefly introduce Jepsen’s testing design for etcd. Etcd uses the Strict Serializability Model for its consistency. Jepsen has developed the following tests for etcd:

## Registers

Registers are a built-in model in Knossos for checking linearizability. Since linearizability applies to a single object, a register is used to represent a single object, supporting read/write/compare-and-set operations. Knossos verifies whether all operations result on registers are linearizable.

## Sets

Sets test for stale reads. Etcd supports allowing stale reads to improve read performance, but it is disabled by default. The Sets test only has a compare-and-set operation, which performs multiple operations on a single key and checks if the results are serializable. In other words, it checks whether each CAS operation occurs atomically.

## Append

The Append test checks for strict consistency and has two operations: read and append. Append means treat the value of a key as a list. The append operation appends an element to this list.

The way to implement append is to first read the value of a key from etcd, and then check if the value has changed within a transaction. If it has not changed, the new value after the append is written.

In this test, not only should all transactions occur atomically, Jepsen also checks if these transactions occur in a real-time order.

## WR

The WR test performs read/write operations on multiple keys using transactions and it also checks for strict serializability.

## Jepsen Xline Test

The Jepsen testing framework consists of four main parts: DB, Client, Checkers, and Nemesis. Each part is a separate interface that users can implement. Since Xline implements an etcd-compatible API, we reused Jepsen’s tests for etcd for Xline. Based on these tests, we implemented the DB interface for Xline in Jepsen. Xline also has its own client SDK that uses CURP consensus, and we also implemented the client interface for this in Jepsen. So the tests are actually divided into compatibility tests for the etcd client and tests for the Xline native client (currently untested).

## Test Result Analysis

Next, I will explain in detail the Xline Jepsen test results and the issues we identified.

## Test Results

In the initial tests, we encountered quite a few problems, with the majority of issues related to the transactional operations in Xline. Some of these issues were minor bugs, while others were design vulnerabilities. Debugging and identifying these problems actually took a considerable amount of time.

I will provide detailed explanations for two main categories of issues: asynchronous storage persistence and revision generation.

## Asynchronous Storage Persistence

In etcd, the storage persistence is synchronous. When a node receives a log, it synchronously persists the log onto the storage device and then executes the commands in the log. After the execution is completed, the results are synchronously persisted onto the storage device. This allows the cluster to tolerate the simultaneous shutdown or power failure of more than a majority of nodes without affecting consistency.

In contrast, Xline assumes that the cluster always has a majority of nodes and does not consider the scenario where all nodes fails at the same time. This is similar to some memory-based Raft implementations. This provides us with some optimization opportunities, and the initial design of Xline was to make all storage persistence operations asynchronous.

However, doing so introduces several issues:

- At this point, the previously mentioned uncertainty in execution order introduces complexity and leads to bugs in the initial implementation:
  - The implementation did not wait for all logs represented by indexes prior to this index to finish execution before executing the read operation.
  - In fact, merely obtaining the command IDs from step 1 is not enough, as the log indexes may represent a newer system state than the command IDs. This is because our log execution is asynchronous, and the order of execution cannot be determined!
- Inconsistency between log storage and KV storage
  Consider this scenario: the KV persistence is completed before log persistence on a node due to the asynchronous nature of these operations. If the node restarts for some reason at this point, it recovers the log which is not up-to-date, leading to the execution of the same log twice during the recovery process. And not all operations are idempotent, for example, executing a predicate-based transaction twice is not idempotent. This indicates that KV persistence must occur after log persistence.

Based on the above issues, we can conclude the fact that asynchronous persistence introduces many additional states to consider, making it difficult to reasoning and analyze system states. Furthermore, it potentially impacts performance. We are currently considering using a synchronous approach instead of asynchronous storage persistence to simplify system implementation. This may sacrifice some performance, but correctness is always more important than performance.

## Revision Generation

In the initial design, we wanted Xline to be compatible with etcd while achieving 1-RTT consensus performance. In etcd, there is a concept called revision which represents the modifications made to the system. For every kv request, a revision needs to be returned. Therefore, we initially implemented a (which has now been proven to be wrong) method to generate revision in 1-RTT. However, it was ultimately proven that generating revision in 1-RTT is not feasible. This implementation also caused Jepsen tests involving revision (specifically, append) to fail.

Now let me explain what our old implementation looked like, why it was wrong, and why generating revision in 1-RTT is not possible.

## Background

First, we need some background on CURP consensus [4]. The principle behind CURP’s 1-RTT implementation is that it has a witness co-hosted on each node. Before executing a command, the client needs to record the command on a majority of witnesses. Then the command can be executed directly on the leader without needing to be replicated to followers because the command information is stored on the witnesses, allowing the original command to be recovered even if a minority of nodes in the cluster has failed. The commands recorded on the witnesses have two characteristics:

1. The commands commute with each other.
2. There is no order between the commands.

This is actually very similar to the implementation of Generalized Paxos [5], both of which optimize request latency by leveraging the commutativity between commands. The commutativity property determines the two characteristics of the commands recorded on the witnesses. Commutativity means that the keys modified by two commands cannot overlap, and non-commuting commands must be executed in serial. Commuting commands can be executed concurrently, which means they have no order between them.

## Analysis of the old implementation

In the old implementation, each node locally assigned a revision to each command. It is necessary to ensure that the order of revision allocation was the same for all commands. Before the execution phase on each node, we assigned revisions to each node according to the order of log indices. At first glance, this doesn’t seem to have a problem. Since revisions are allocated in the order of log indices, shouldn’t the order of revision allocation on each node be the same? However, we overlooked one thing: some information of the commands may still be recorded on the witnesses! If a node crashes and recovers from the witness, it does not know the order of the recovered commands, which leads to inconsistent orders of revision allocation on different nodes.

## Why generating revision in 1-RTT is not possible?

The concept of revision is natural for Raft, where the entire distributed system is abstracted as a state machine, and the value of revision represents the state. This indicates that there is a global order for all modifications to the system.

For CURP consensus protocol, since the commands recorded on the witnesses are unordered (due to the requests from clients being concurrent), if we want to figure out the order, we must introduce an additional RTT to synchronize them on each witness. This two-step process of recording and sorting requires at least two RTTs.

Like Generalized Paxos, CURP uses commutativity, which implies that there may be no order between commands. So all commands form a partial order known as a command history [5]. In this case, the concept of revision is not applicable.

In the Generalized Consensus and Paxos paper, the author actually proves that in Generalized Consensus, it requires at least two message delays to determine the order between any two commands (Learning is impossible in fewer than 2 message delays). Here is the proof from the original paper [5]:

> Suppose l learns a value proposed by p in one message delay.
> Then it is possible that every message sent by p was lost except for ones
> received by l. If all messages from p and l to other processes are lost, then
> there is nothing to prevent another learner from learning a different value
> proposed by another proposer, violating consistency.

## Fix in Xline

1. etcd compatibility
2. According to the previous discussion, it is actually impossible for Xline to maintain its 1-RTT consensus performance while being compatible with etcd revision. So in the compatibility layer with etcd, we need to wait for each command to be committed before assigning a revision to it, which requires two RTTs.
3. Append test
4. The transaction test in the Append test uses revision to ensure atomicity of the transaction. The Append test requires strict serializability. In the previous discussions, it can be seen that for CURP consensus, there is no global order for all commands, so this actually violates the requirement of strict serializability. The partial order in CURP only guarantees serializability. Therefore, in the Xline test (non-etcd compatible), we cannot directly use the Append test. In other words, when writing Jepsen tests for Xline, the consistency model should be changed to a weaker serializability model.

## References

[1]  
P. B. Gibbons and E. Korach, “Testing shared memories,” Siam journal on computing, vol. 26, no. 4, pp. 1208–1244, 1997.

[2]  
C. H. Papadimitriou, “The serializability of concurrent database updates,” Journal of the acm (jacm), vol. 26, no. 4, pp. 631–653, 1979.

[3]  
“Jepsen consistency.” Available: https://jepsen.io/consistency

[4]  
S. J. Park and J. Ousterhout, “Exploiting commutativity for practical fast replication,” in 16th usenix symposium on networked systems design and implementation (nsdi 19), Boston, MA: USENIX Association, Feb. 2019, pp. 47–64. Available: https://www.usenix.org/conference/nsdi19/presentation/park

[5]  
L. Lamport, “Generalized consensus and paxos,” 2005.
