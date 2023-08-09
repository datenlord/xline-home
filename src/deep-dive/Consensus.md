# Basic Concept

## CAP Theorem and PACELC theorem

In theoretical computer science, the CAP theorem, also named Brewer's theorem after computer scientist Eric Brewer, states that any distributed data store can provide only two of the following three guarantees:

- Consistency: Every read receives the most recent write or an error.
- Availability： Every Request receives a (non-error) response, without the guarantee that it contains the most recent write.
- Partition tolerance: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

To deal with a [network partition](https://en.wikipedia.org/wiki/Network_partition) failure, one of the following options must be chosen:

- cancel the operation and thus decrease the availability but ensure consistency.
- proceed with the operation and thus provide availability but risk inconsistency.

Thus, if there is a network partition, one has to choose between consistency or availability. Note that consistency as defined in the CAP theorem is quite different from the consistency guaranteed in [ACID database transactions](https://en.wikipedia.org/wiki/ACID).

Eric Brewer argues that the often-used "two out of three" concept can be somewhat misleading because system designers need only to sacrifice consistency or availability in the presence of partitions, but that in many systems partitions are rare. The **PACELC theorem** is an extension to the CAP theorem. It states that in case of network partitioning (P) in a distributed computer system, one has to choose between availability (A) and consistency (C) (as per the CAP theorem), but else (E), even when the system is running normally in the absence of partitions, one has to choose between latency (L) and consistency (C).

Read the following docs for more information:

1. CAP Theorem：
   - Paper: [Brewer's Conjecture and the Feasibility of Consistent Available Partition-Tolerant Web Services](https://users.ece.cmu.edu/~adrian/731-sp04/readings/GL-cap.pdf)
   - Blog: [An Illustrated Proof of the CAP Theorem](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)
2. PACELC Theorem(Paper): [Consistency Tradeoffs in Modern Distributed Database System Design](https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf)

## FLP Impossibility

The paper "[Impossibility of Distributed Consensus with One Faulty Process](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf)", published by Fischer, Lynch and Patterson in April 1985, proposed the "FLP Impossibility", specifying an upper bound on what is possible using distributed processes in an asynchronous environment. The consensus problem is solvable in a synchronous environment where processes can proceed simultaneously. The synchronous model allows detecting faults by waiting the entire length of a step for a process to reply, and assuming it has crashed if no reply is received.

Mechanisms that determine whether a failure has occurred based on how long a reply has been received do not work in a fully asynchronous message-passing distributed system. This is because in an asynchronous environment, there is no upper limit to how long a process can reply to a message after completing its work. Thus, it is impossible to tell whether a process has crashed or has taken a long time to respond. The FLP impossibility shows that in a completely asynchronous system, even if only one node fails, there is no algorithm that can bring the system to consensus. This impossibility comes from the worst-case scheduling scenario, which is unlikely to happen in practice except in adversarial situations, such as an intelligent denial-of-service attacker in the network. In most normal cases, process scheduling has a degree of natural randomness.

A randomized consensus algorithm can circumvent the FLP Impossibility, achieving security and effectiveness with overwhelming probability, even in the worst case scheduling scenario, such as an intelligent denial-of-service attacker in the network.

# Consensus Protocol

## Paxos

Paxos is a consensus algorithm proposed by Leslie Lamport in 1989. The initial paper was "[The Part-Time Parliament](http://lamport.azurewebsites.net/pubs/pubs.html#lamport-paxos)", but it was not published. Lamport wrote “[Paxos Made Simple](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)” in 2001 and formally proposed the algorithm.

Paxos uses proposals to drive the entire algorithm, so that the system resolves to the same proposal. Each node continuously proposes a proposal through messaging, and each proposal includes a proposal number and a proposal value. Paxos considers that if more than half of the nodes in the cluster unanimously accept the proposal, a consensus on the proposal is reached and the proposal is said to be **chosen**.

Paxos divides the system into the following roles:

- Client: The client sends a request to the distributed system and waits for a response.
- Proposer: When the proposer receives a request from the client, it makes a relevant proposal, tries to get the receiver to accept the proposal, and coordinates in case of conflict to drive the algorithm to run.
- Acceptor: also called voter, votes to accept or reject the proposer's proposal, and if more than half of the receivers accept the proposal, the proposal is chosen.
- Learners: Learners can only learn the chosen proposal and do not participate in the proposal voting. Once the client's request is unified by the acceptors, the learner can execute the requested operation in the proposal and initiate a response to the client. To improve system availability, multiple learners can be added.

Paxos represents a family of protocols, including:

- Basic Paxos: The basic protocol, allowing consensus about a single value.
- Multi Paxos: Allow the protocol to handle a stream of messages with less overhead than Basic Paxos.
- [Cheap Paxos](https://lamport.azurewebsites.net/pubs/web-dsn-submission.pdf): Reduce number of nodes needed via dynamic reconfiguration in exchange for reduced burst fault tolerance.
- [Fast Paxos](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2005-112.pdf): Reduce the number of round trips in exchange for reduced fault tolerance.

Since Paxos is difficult to understand, algorithms like Raft are designed to be easier to understand.

## Raft

In 2013, Diego Ongaro and John Ousterhout of Stanford University published “[In Search of an Understandable Consensus Algorithm with the goal of comprehensibility](https://raft.github.io/raft.pdf)”, formally proposing the Raft algorithm, which aims to optimize the Paxos family of algorithms into a consensus algorithm that is easier to understand and equally satisfying in terms of [safety and liveness](https://en.wikipedia.org/wiki/Safety_and_liveness_properties).

Raft is similar to Multi-Paxos in that it is a leader-based consensus algorithm. Nodes in the Raft algorithm can only be in one of three states at any given time.

- Leader: The leader is responsible for handling all client requests and log replication. There can be at most one working leader in the system at the same time.
- Follower: Passively handling requests from the leader. Most of the nodes in the cluster are in this state.
- Candidate: A transitional state between leader and follower, used to elect a new leader.

Follower persists requests from the leader as log entries as soon as they are received. When a quorum (majority) of nodes confirm that the entry has persisted in their logs, the leader commits the log and followers apply the log entry to its own state machine. When there is a network partition in the system, the partition containing the majority of nodes can still process client requests normally.

Raft ensures strong consistency of the distributed system through the leader. Raft supports leader election. When the leader crashes, one of the followers is elected as the new leader. Only the follower with more complete logs than the majority of nodes in the cluster can be elected as a leader. From this implementation of leader election, Raft is not a Byzantine fault-tolerant consensus algorithm. Any node can interfere with the cluster by initiating an election and falsely claiming to have the latest logs.

In addition, there are several optimizations that can be applied to Raft. Prevote can be used to introduce a pre-selection of possible leaders, allowing them to gauge their ability to become leaders before potentially disrupting the cluster. Joint consensus can support arbitrary grouping changes, allowing for better scaling. Batching and pipelining can help high-throughput systems perform better.

## CURP

The CURP algorithm was proposed by Seo Jin Park and John Ousterhout of Stanford University in their paper “[Exploiting Commutativity For Practical Fast Replication](https://www.usenix.org/system/files/nsdi19-park.pdf)” published in 2019.

Traditional approaches to replication, be it Raft or Multi-Paxos, require client requests to be ordered before making them durable by copying them to replica. As a result, clients must wait for two round-trip times (RTTs) before updates complete. The Consistent Unordered Replication Protocol (CURP) allows clients to replicate requests that have not yet been ordered, as long as they are commutative. This strategy allows most operations to complete in 1 RTT.

CURP supplements a system's existing replication mechanism with a lightweight form of replication without ordering based on witness. A client replicates each operation to one or more witnesses in parallel with sending the request to the primary server. The primary can execute the operation and return to the client without waiting for normal replication, which happens asynchronously. This allows operations to complete in 1 RTT, as long as all witnessed-but-not-yet-replicated operations are commutative. Noncommutative operations still require 2 RTTs. If the primary crashes, information from witnesses is combined with that from the normal replicas to re-create a consistent server state.

Xline is a distributed key-value store engine which can achieve high-performance data access and strong consistency in cross data center scenarios. The network latency between different data centers is very high, often tens or even hundreds of milliseconds. Ideally, since CURP protocol can save an RTT to reach consensus than Raft or Multi-Paxos does, Xline uses CURP to achieve high-performance data access and strong consistency in cross data center situations.

Read the [blog](/xline-home/#/blog) for more information about the CURP Protocol.