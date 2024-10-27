---
  cover: /xline-home/blog/Xline-0.7-Refactoring-Performance-Analysis-Overview/cover.png
  author:
    name: Zhenghao Yin
    url: https://github.com/bsbds
    img_url: https://avatars.githubusercontent.com/u/69835502?v=4
  read_time: 10
---
In Xline 0.7.0, we undertook a significant refactoring of the Xline codebase, achieving nearly a 20x performance improvement in certain benchmarks. This article delves into the redesigned command execution flow in Xline and outlines the optimizations that led to these performance gains.
---
 
## Table of Contents
1. Reconfiguration overview
2. Performance Analysis of etcd
   1. Etcd Command Execution Flow
   2. Key Performance Overheads
      - gRPC requests
      - Storage IO
   3. Why etcd Struggles to Scale Performance on Multi-Core CPUs
3. Xline Refactoring Overview
   1. Similarities Between Xline and etcd
   2. Conflict Detection Performance in CURP
   3. Replaces RocksDB with WAL
   4. Cmd worker/Conflict Checked MPMC
   5. Client propose
4. Problems in Implementation
   1. Concurrent Execution Issues
      - Concurrency Overhead
      - Lock Convoy
   2. Are IO Blocking Operations in Async Really Harmful?
      - IO in WAL
      - IO in RocksDB
   3. Internal Mutability
   4. Hidden Memory Allocations
   5. Lock-Free Data Structures
5. Summary
## Refactoring Overview
In Xline 0.7.0, we undertook a significant refactoring of the Xline codebase, achieving nearly a 20x performance improvement in certain benchmarks. This article delves into the redesigned command execution flow in Xline and outlines the optimizations that led to these performance gains.
## Performance Analysis of etcd
Since the implementation of Xline is similar to etcd, it shares the same performance bottlenecks. Therefore, before delving into Xline's performance, let's first analyze the performance characteristics of etcd.
## Etcd Command Execution Flow
To analyze the performance, we first need to outline the execution flow of etcd commands. etcd employs the Raft consensus algorithm, and the command execution flow is straightforward:

1. The node receives the command from the client.
2. The node writes the command to its own log.
3. The node replicates this log entry to a majority of follower nodes.
4. The node executes the command in its state machine, persisting the result to backend storage.
5. The node returns the execution result to the client.
### Key Performance Overheads
Several factors impact the performance of an etcd node. To analyze the performance, the primary task is to examine the various types of operations on the critical path, including CPU time and different types of IO operations. I will analyze these operations individually. Since the leader node bears the most pressure in an etcd cluster, the following performance analysis focuses on the leader node.
#### gRPC Requests
There are two primary types of gRPC communication in etcd: one for processing commands sent by clients and another for replicating logs to follower nodes. Both types are on the critical path, as the first involves direct client interaction and the second requires log replication to a majority of nodes before returning results to clients.

In golang's gRPC performance tests, single-core CPUs typically handle tens of kilobytes of requests per second. Given that etcd is designed to manage similar request volumes, the gRPC server in etcd faces significant pressure. Consequently, gRPC can become a performance bottleneck, especially in constrained environments.
#### Storage IO
For I/O on the storage device, there are two major types:
1. Persisting each command to the Write-Ahead Log (WAL).
2. Persisting the command to the backend storage during execution.
Both operations must complete before returning results to the client, placing them on the critical path.

Due to Raft's safety requirements, persisting to the WAL must be synchronized with a disk flush (fsync) before subsequent operations. This makes fsync a performance bottleneck, as even on SSDs, a single fsync can take hundreds of microseconds.

In contrast, persistence to backend storage does not have stringent safety requirements and only needs to maintain atomicity. It does not require fsync for every call, allowing most operations to be performed in memory. These operations are generally non-blocking and do not cause significant performance bottlenecks.
### Why etcd Struggles to Scale Performance on Multi-Core CPUs
etcd guarantees strict serializability, requiring all operations to be executed in a global order. This constraint prevents concurrent execution of command processing logic. For instance, when processing a Raft log, a global lock must be acquired before proceeding with subsequent operations. Similarly, backend command execution must occur sequentially one by one, making it impossible for parallel execution. Consequently, etcd's throughput is significantly limited by the performance of a single thread.
## Xline Refactoring Overview
In this section, I will provide an overview of the key aspects of the Xline refactoring that significantly impact performance, focusing primarily on the modifications to the command execution mechanism.
### Similarities Between Xline and etcd
Xline employs the CURP consensus algorithm, which differs from Raft primarily in its division into front-end commit and back-end commit phases. The back-end commit is similar to Raft, requiring the leader to replicate the log to a majority of nodes. The front-end commit is achieved through the WITNESS mechanism, where the client directly records to the WITNESS for a fast commit. Therefore, to evaluate Xline's performance, we must analyze both the front-end WITNESS performance and the back-end Raft performance.
### Conflict Detection Performance in CURP
In CURP, to ensure the commutativity of commands on a Witness, conflict detection must be performed on all commands. The initial approach in Xline involved placing all commands in a list and iterating through it to check for conflicts, resulting in O(n) complexity for each conflict check on the critical path, which is highly inefficient. Additionally, a lock had to be added to the outer layer of the list, causing a significant lock convoy phenomenon, which I will detail later.

In the revised conflict detection mechanism, we use an interval tree to optimize the complexity of KV command conflict detection, reducing the time complexity to O(log(n)) and significantly improving efficiency. The performance impact is minimal even on the critical path. The interval tree implementation is detailed in previous articles and will not be repeated here.
### Replaces RocksDB with WAL
Xline initially used RocksDB as the log store for CURP. However, since CURP's logs are appended sequentially, RocksDB was not the optimal choice due to its need to write to its own WAL first, then to a MemTable, and finally to an SST file, which is redundant for our use case. In our new implementation, we developed a custom WAL to serve as CURP's log store. This WAL implementation is straightforward, utilizing multiple WAL files with log appends performed as single file appends. This ensures that all log append operations are sequential file writes, which is highly efficient and eliminates write amplification.
### Cmd Worker/Conflict Checked MPMC
Xline originally implemented a structure called conflict-checked MPMC (Multiple Producer, Multiple Consumer) for concurrent command execution. It dynamically maintains conflict relationships between commands and dispatches conflict-free commands to command workers for execution.
![图片](/xline-home/blog/Xline-0.7-Refactoring-Performance-Analysis-Overview/image1.png)
However, due to the need to dynamically maintain conflicting relationships, the order in which commands are sent to this MPMC forms a DAG of conflicting relationships, resulting in an O(n) time complexity for a single insertion. Although the implementation uses channels for communication, avoiding lock contention, it remains inefficient under high throughput. This construct has been removed in the latest design.

Another issue involves the command workers receiving commands from the conflict-checked MPMC. Xline initially spawns a number of workers that communicate with the MPMC through channels. However, this is unnecessary because Xline is built on Tokio's runtime, which already uses a worker paradigm. Implementing additional workers to execute commands on top of the runtime's workers introduces unnecessary message overhead. Instead, commands should be executed directly using `tokio::spawn`.
### Client Propose
In CURP, the client's propose is divided into a fast path and a slow path. Commands with no conflicts can take the fast path, completing with only 1 RTT. If a conflict is found, the client must ask the leader to synchronize the command to most nodes before returning the result.

In the previous implementation of Xline, a client propose involved two gRPC unary requests. The first request, Propose, is sent to the leader and contains the actual command, returning the result of the fast path. The second request, WaitSynced, waits for synchronization to complete if the fast path fails.

While this design is simple, it has performance issues. Compared to etcd, which returns all commands to the client after synchronization, requiring only one unary request for propose, Xline's approach requires the client to send two requests to the leader. This significantly increases the load on the gRPC server. With similar gRPC performance, Xline can handle only about half the requests of etcd with the same CPU time.

To address this problem, we implemented client propose using gRPC streams. This allows the client and server to create a bi-directional stream for communication. The client sends one message into the stream and receives one or two replies depending on the situation. The leader processes the message from two to one, and in the fast path, only one message needs to be returned. This greatly improves the efficiency of gRPC command processing.
## Problems in Implementation
### Concurrent Execution Issues
In the initial design of Xline, we aimed to leverage the advantages of CURP by maximizing concurrent execution. In CURP, commands that do not conflict can theoretically be executed concurrently. We initially designed the conflict-checked MPMC data structure to enable this, but it negatively impacted performance. Here’s why:
#### Concurrency Overhead
1. Short Execution Process, Expensive Concurrency Cost \
For a put command, during speculative execution, we don't need to write to the DB. We only need to ensure the command is successfully persisted to the context to return the result to the client. Therefore, for commands that don't require DB operations, concurrent execution is unnecessary.

2. Communication Overhead \
To achieve concurrency, channels are used to communicate between different tokio tasks, which incurs a non-negligible overhead:
    - Thread Communication Overhead: Data needs to be copied between threads.
    - CPU Cache Utilization: Inability to utilize the CPU cache effectively, resulting in numerous memory accesses.
3. Impact on RocksDB IO \
Concurrent execution negatively affects RocksDB IO Concurrent execution writes to RocksDB individually when each command completes, which is equivalent to using multiple threads to write to RocksDB. This is actually very inefficient, causing more IO operations on the one hand, and serious write amplification on the other. Even though the underlying implementation of RocksDB performs batching on operations, it is still more inefficient than managing batch manually.
##### Alternatives to Concurrency
In the refactored version, we have removed concurrent operations. All thread IO operations are sent via a channel to a dedicated thread, where they are batched and then submitted to storage. This approach significantly improves IO efficiency and overall system performance.

You might wonder if batching negatively impacts latency. Our solution is as follows: after the dedicated thread receives an operation from the channel, it will busy-wait in a loop to check for additional operations. Given that Xline is designed to handle tens of thousands of requests per second, it can loop hundreds to thousands of times. This approach ensures that it doesn't commit too much at once under high load and doesn't waste CPU time under low load, ultimately minimizing latency impact.

Using a timer, such as `std::thread::sleep` or `tokio::time::sleep`, would be less efficient. The former requires a system call, which is inefficient and blocks Tokio's worker. The latter, if yielded to the runtime, cannot accurately determine the sleep duration, especially under high load. Therefore, using a timer is almost impractical.
#### Lock Convoy
During our initial debugging of Xline, we observed that Xline's CPU usage was very low, with CPU time percentages in the tens on multi-core CPUs even at maximum throughput. Consequently, our maximum throughput was also very low, at about a few thousand requests per second. Why is this?

The root cause of this issue is the lock convoy phenomenon. As explained earlier, we use a lock to protect a data structure. When executed concurrently, multiple threads attempt to acquire the lock to update the data structure, leading to significant CPU time spent on these updates. Although it appears as concurrent execution, most threads spend their time waiting to acquire the lock.

Moreover, Tokio's async model employs a small pool of fixed threads as workers. Since Xline uses synchronized locks, if a worker thread holds the lock for too long, it causes the remaining worker threads to go into hibernation. These threads are not only unable to update the data structure but also unable to perform other tasks, resulting in a lock convoy. This explains Xline's very low CPU usage, as most of the time only one thread is active, failing to leverage asynchrony.

There are several ways to mitigate the lock convoy problem in Xline:
1. Optimize Data Structure Time Complexity: Reduce the CPU time spent on update operations by optimizing the time complexity of the data structure.
2. Backpressure: Actively reduce the load on the locks. For example, when the size of the data stored in the data structure reaches a certain limit, prevent more threads from continuing to update the data structure. This helps dissipate the lock convoy phenomenon more quickly.
3. Dedicated Update Thread: Use a single dedicated thread to update the data structure, with other threads sending update operations to this thread via a channel. Although this introduces inter-thread communication overhead, it eliminates the lock convoy problem.
### Are IO blocking operations in Async really harmful?
The next issue is IO blocking. In async code, we typically use the async versions of various structures rather than their synchronized counterparts when dealing with IO operations. But should synchronized versions really be avoided in async code?
#### IO in WAL
Initially, we used Tokio's tokio::fs to implement the Write-Ahead Log (WAL). However, during performance testing, we found that WAL's write efficiency was very low. A single log append operation took several milliseconds to tens of milliseconds. Even with batching, such high latency was unacceptable.

The high latency was due to Tokio runtime scheduling. When using async file operations, if the runtime is under high load (e.g., handling many gRPC requests), the future yielded by the file operation may not be scheduled promptly. This results in high latency for file writes.

Moreover, not all file operations in tokio::fs are truly asynchronous. For example, fsync/fdatasync operations are moved to Tokio's blocking thread using tokio::task::spawn_blocking. On modern SSDs, a single fsync operation takes only a few hundred microseconds, so it's usually not considered a blocking operation. Moving it to another thread and sending back the result introduces unnecessary overhead.

Another reason to use synchronized fsync for WALs is that a WAL write is a high-priority operation. If the WAL write doesn't complete, no other work on the node can progress. Therefore, it's better to write synchronously each time a WAL is written. Even if the blocking time is long in rare cases, it will only block one thread, which doesn't significantly impact system performance in a multi-core CPU environment.

The latency of tokio::fs has been a known issue, as discussed in the [Tokio repo issue](https://github.com/tokio-rs/tokio/issues/3664). We ultimately replaced tokio::fs with std::fs. In new performance tests, the average latency of a single log append operation dropped to less than a millisecond.
#### IO in RocksDB
Initially, during the refactoring, we used tokio::task::spawn_blocking to offload RocksDB operations to other threads, as RocksDB doesn't support asynchronous writes. However, this approach did not yield a performance improvement. There are two main reasons for this:

1. Cache Operations: Similar to BoltDB used by etcd, without fsync, most of RocksDB's IO operations are performed in cache. Therefore, RocksDB operations are typically completed very quickly and cannot be considered blocking operations. Offloading these operations to other threads is redundant.
2. Internal Thread Pool: RocksDB has its own thread pool. The actual processing logic and IO operations are handled by these threads, ensuring that these operations do not block the Tokio worker thread.

In summary, RocksDB operations are asynchronous-friendly. We can call these operations directly in asynchronous code without worrying about blocking.
### Internal Mutability
Next, I'll talk about the use of internal mutability in Xline, which was originally designed to leverage the internal mutability paradigm for concurrent execution. The most common use of internal mutability in multithreaded code involves Mutex or RwLock locks.
A simple API example:
```
trait KvOperations<K, V> {
    fn insert(&self, key: K, value: V);
    fn query(&self, key: &K);
}

impl KvOperations<K,V> for KvObject {
    fn insert(&self, key: K, value: V) {
        self.inner.write().insert(key, value);
    }
    ...
}

fn thread0<T: KvOperations>(a: T, key: K, value: V) {
    a.insert(key, value);
}

fn thread1<T: KvOperations>(a: T, key: K) {
    a.query(key);
}
```
For operations like insert, which modify the data structure, the API definition only requires an immutable reference. While this design may seem convenient, we found during refactoring that these immutable references often hinder the underlying data structure's lock usage. Consequently, users may not consider lock contention in a multithreaded environment.

For example, in the case of thread0 and thread1, the caller doesn't know what locks are being used internally or whether there is contention with other threads. This can lead to API misuse and intense locking competition among multiple threads.

A better approach is to leverage Rust's ownership model and delegate lock management to the caller. Here is a modified example:
```
trait KvOperations<K, V> {
    fn insert(&mut self, key: K, value: V);
    fn query(&self, key: &K);
}

impl KvOperations<K,V> for KvObject {
    fn insert(&mut self, key: K, value: V) {
        self.inner.insert(key, value);
    }
    ...
}

fn thread0<T: KvOperations>(a: Arc<RwLock<T>>) {
    a.write().insert(key, value);
}

fn thread1<T: KvOperations>(a: Arc<RwLock<T>>) {
    a.read().query(key, value);
}
```
This approach forces the caller to consider lock contention. For example, if a read lock is acquired in thread1, the caller knows that this action will block a write lock in another thread. It also provides more flexibility in code implementation, such as holding a lock and performing a series of operations instead of repeated locking with multiple internal variables.
### Hidden Memory Allocations
Hidden memory allocations can significantly impact performance. In our refactoring, we switched Xline's memory allocator from glibc to jemalloc, resulting in a notable performance improvement.

Jemalloc is effective in reducing memory fragmentation, making it faster for many small allocations. Analyzing the Xline code, we identified numerous hidden heap allocations, primarily used for command processing. These include operations like Arc::new, Vec::clone, and various serialization tasks. In our benchmark use case, commands are only a few hundred bytes, classifying these allocations as small.

Xline faces two main issues: excessive small allocations leading to memory fragmentation, and heap allocations occurring while holding locks, which significantly increases lock-holding time.

To mitigate these issues, avoid hidden memory allocations like Arc::new and leverage Rust's lifecycle mechanisms to minimize unnecessary heap allocations. Additionally, strive to reduce heap allocations overall.
### Lock-free Data Structures
In our Xline performance analysis, we found that some lock-free data structures negatively impact system performance, contrary to their claims.

The first example is DashMap, a concurrent implementation of HashMap. In actual tests, DashMap traversal efficiency was significantly lower, even an order of magnitude slower than HashMap. This inefficiency is due to DashMap's internal use of Arc, which reduces dereference efficiency.

The second example is SkipMap in crossbeam. Although SkipMap supports lock-free concurrent operations, its single-threaded insertion and deletion performance is more than twice as slow compared to RwLock<BTreeMap>. Despite having similar time complexity, BTreeMap's lower tree height and cache-friendly features result in better performance.

In conclusion, be cautious when replacing traditional locking data structures with lock-free alternatives, as they may not always provide the expected performance benefits.
## Summary
In this refactoring of Xline, we made significant improvements to the command execution process, including conflict detection optimizations, storage optimizations, and client request processing optimizations. We also identified and addressed several potential performance issues. Through this process, we gained valuable performance optimization techniques that will benefit Xline's ongoing development and future performance enhancements.