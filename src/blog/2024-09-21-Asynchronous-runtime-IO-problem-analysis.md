---
  cover: /xline-home/blog/Asynchronous-runtime-IO-problem-analysis/cover.png
  author:
    name: Zhenghao Yin
    url: https://github.com/bsbds
    img_url: https://avatars.githubusercontent.com/u/69835502?v=4
  read_time: 10
---
In the performance testing of Xline, I ran into some issues with the asynchronous runtime. I found that using asynchronous file reads and writes in the WAL (Write-Ahead-Log) implementation produces high latency, which is unacceptable since WAL writes are on the critical path. How can this be optimized?
---

## Table of Contents
1. Xline Runtime Performance Issues
2. Asynchronous Runtime and Blocking Operations
3. Runtime Scheduling Issues
4. Performance Testing
   - Analyzing Test Results
5. How to implement correctly?
6. When can you block on the Runtime?
7. Summary

Programming in an asynchronous runtime is often difficult. In this article, we will discuss the IO issues in Rust's asynchronous runtime and how to use Tokio runtime correctly in code implementations for optimal performance, mainly through a few examples from Xline development. I'll be using Tokio runtime for the examples in this article. All examples in this article run on：
```
AMD EPYC 7543 32-Core Processor
Samsung 980 pro NVME SSD
Ubuntu 22.04.3 LTS, GNU/Linux 6.5.0-21-generic
rustc 1.79.0 (129f3b996 2024-06-10)
tokio 1.38.0
```
## Xline runtime performance issues
In the performance testing of Xline, I ran into some issues with the asynchronous runtime. I found that using asynchronous file reads and writes in the WAL (Write-Ahead-Log) implementation produces high latency, which is unacceptable since WAL writes are on the critical path. How can this be optimized?
## Asynchronous Runtime and Blocking Operations
Let's start with a brief review of the asynchronous runtime mechanism in Rust. Rust's async mechanism achieves concurrency through collaborative scheduling. The runtime maintains a pool of threads (called worker threads in Tokio). The number of the threads is usually equal to the number of the CPU threads on the host. For each thread in the pool, the runtime will allocate an executor. The runtime distributes the tasks to each executor through a scheduler.
In Rust async code, tasks collaborate by switching at the .await point. When .await is called, control is handed back to the scheduler, allowing other tasks to run. Here's an example of an asynchronous pattern:
```
#[tokio::main(flavor = "current_thread")]
async fn main() {
    let task = tokio::spawn(async {
        println!("Hello");
    });
    tokio::time::sleep(Duration::from_secs(1)).await;
    println!("World!");
    task.await.unwrap();
}
```
If we set tokio to use current_thread, then there will be only one thread running in tokio runtime. In the code above, there are two tasks: the main task and another task spawned by tokio::spawn. When we call the asynchronous tokio::time::sleep from the main task, it hangs up with .await and switches to the other task. This way, no time is wasted waiting for the file to be read.
Here's another example describing a blocking operation:
```
use tokio::time::Duration;

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let task = tokio::spawn(async {
        println!("World!");
    });
    std::thread::sleep(Duration::from_secs(1));
    println!("Hello");
    task.await.unwrap();
}
```
std::thread::sleep is a blocking operation, unlike tokio::time::sleep. It is a direct system call that puts the entire thread to sleep. When we use std::thread::sleep, it prevents the scheduler from switching to another task, and our spawned task cannot make any progress, thus wasting CPU resources.
If we avoid blocking operations, Rust's asynchronous runtime efficiently uses CPU time, providing zero-cost abstraction. Still, we need to think about how to use asynchronous runtime effectively in practice.
## Runtime Scheduling Issues
To address our previous question about the performance of Write-Ahead Logging (WAL), let's begin by examining the following simplified code.
```
#[tonic::async_trait]
impl Protocol for Server {
    async fn propose(
        &self,
        request: Request<ProposeRequest>,
    ) -> Result<Response<ProposeResponse>, Status> {
        let req = request.into_inner();
        let (tx, rx) = oneshot::channel();
        self.send_to_persistent((req, tx));
        Ok(Response::new(rx.recv().await))
    }
}

impl Server {
    async fn persistent_task(&self) {
        loop {
            let (reqs, txs) = self.recv_batch().await {
                self.log_file.write_all(reqs.encode()).await;
                self.log_file.fdatasync().await;
                for tx in txs {
                    tx.send(ProposeResponse {});
                }
            }
        }
    }
}
```
The gRPC server in Xline in the above code accepts ProposeRequests from clients. For each ProposeRequest, Xline writes it to a WAL file and synchronizes it to the storage device. To reduce the write latency, we use a dispatch pattern in persistence: each request will be sent to persistent_task through a channel, then the persistent_task fetches one batch request at a time and writes it to the file.
The writing and synchronization of the log_file are done using Tokio's asynchronous filesystem operations, allowing us to continue processing commands from other clients during the writing process. On the surface, this seems efficient. However, during performance testing, we found that under high load, write_all and fdatasync operations can take several milliseconds to complete.
This example demonstrates an anti-pattern in using asynchronous runtimes for file operations. When the Xline server is under heavy load, the runtime is stacked with tasks. If persistent_task yields to the runtime in the middle of an asynchronous write, it takes significantly longer to be rescheduled. Even though the write operation may have completed in the kernel, persistent_task cannot make progress. Under high load, the runtime may prioritize gRPC requests, causing the first request received by the server to be deprioritized. This conflict between request prioritization and runtime scheduling results in performance degradation.
## Performance Test
We can substantiate the above claims by writing a simple performance test to demonstrate the issues of using asynchronous I/O in a heavily loaded runtime. In this test, we will generate CPU-intensive tasks to increase the runtime load and simultaneously perform a performance test of file I/O.
Complete test code:https://github.com/bsbds/bench_tokio_fs
Test results:https://bsbds.github.io/bench_tokio_fs/report/
Name used in tests.
- fswrite: File write in Tokio runtime, using synchronous file IO
- fs_write_async: File write in Tokio runtime, using asynchronous file IO
- fs_write_thread: File write in Tokio runtime, using synchronous file IO with a separate thread
- noload: No workload on Tokio runtime at this time
- stress: Large workload on Tokio runtime at this time
### Analysis of test results
Below is a violin plot of the test results.
![image](/xline-home/blog/Asynchronous-runtime-IO-problem-analysis/image1.png)
From the figure, we can see that using file I/O on the Tokio runtime, whether synchronous or asynchronous, results in increased latency to varying degrees. Specifically, for purely asynchronous file I/O, there is a substantial increase in average latency and a relative increase in the variance of write latency, which further increases the uncertainty of write latency. This aligns with our expectations.
## How to implement it correctly?
The core issue is that Tokio does not support task prioritization. Due to the uncertain execution time of individual tasks, we cannot accurately predict when each task will be rescheduled under high load.
To implement task prioritization in Tokio, we might use a priority queue to maintain task priorities. However, since Tokio may need to handle hundreds of thousands or even millions of tasks simultaneously, and most tasks are short-lived, using a priority queue would result in significant overhead. Additionally, maintaining global task priorities would lead to strong competition between worker threads, conflicting with Tokio's work-stealing mechanism.
If scheduling priority is needed, it should be implemented with a small number of tasks and without a large number of short tasks. Prioritization can only be implemented in the local work queue of worker threads to avoid competition.
Given the difficulty of implementing a low-overhead prioritization mechanism in existing runtimes, the correct approach when using Tokio runtime with high-priority tasks is to run them in a separate thread pool to avoid starvation. This can be achieved by running multiple Tokio runtimes simultaneously or manually building a custom thread pool.
When writing code on top of the Tokio runtime, it is crucial to prioritize tasks. In our use case, the Tonic gRPC server consumes significant CPU time, potentially starving other tasks in the same runtime under high load. Therefore, we should consider splitting CPU-bound and I/O-bound tasks into two thread pools. The persistent_task is on the critical path and therefore should have the highest priority. A more appropriate approach would be to isolate the persistent_task from the runtime by spawning a dedicated system thread.
## When you can block on Runtime
In the performance test example above, we observe that file IO (fs_write) performance remains relatively good even when synchronized directly on the runtime. You may have heard the advice to never block in an asynchronous runtime. For instance, the Future trait documentation states:
An implementation of poll should strive to return quickly, and should not block.
However, this guideline is not universally applicable. Blindly implementing theoretically non-blocking I/O can sometimes negatively impact system performance.
For example, in Xline, we use RocksDB as the underlying key-value storage engine. Since the rocksdb crate is a wrapper around a C++ library and does not inherently support asynchronous interfaces, we may worry that using a synchronous interface will block the runtime. Consequently, we might attempt to use RocksDB in a non-blocking manner.
```
{
    tokio::task::spawn_blocking(move || {
        db.put("foo", "bar").unwrap();
    })
    .await;
}
```
The effect of tokio::task::spawn_blocking is to offload blocking tasks to the runtime's dedicated blocking threads. These blocking threads are part of a separate thread pool, ensuring they do not block the executor's main thread pool.
Those unfamiliar with RocksDB might assume that db.put involves file operations and is therefore blocking. This is not entirely accurate. To illustrate this, we can build a simple benchmark.
The following benchmark writes a batch of 100 keys to the database, with each key being 256 bytes and each value being 1024 bytes.

Complete test code: https://github.com/bsbds/bench_rocksdb
Test results:https://bsbds.github.io/bench_rocksdb/report/
```
fn rocksdb_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("rocksdb_benchmarks");
    let rt = build_runtime();
    let db = Arc::new(DB::open_default(BENCH_PATH).unwrap());

    group.bench_function("rocksdb_write_sync", |b| {
        b.to_async(&rt).iter(|| async {
            db_write(&db);
        })
    });
    group.bench_function("rocksdb_write_async", |b| {
        b.to_async(&rt).iter(|| {
            let db_c = Arc::clone(&db);
            tokio::task::spawn_blocking(move || db_write(&db_c))
        })
    });
    group.finish();

    clean_up();
}
```
In rocksdb_write_sync, the database is written to directly and synchronously. In contrast, rocksdb_write_async uses spawn_blocking to convert the synchronous operation into an asynchronous write to the database. The results are as follows:
![image](/xline-home/blog/Asynchronous-runtime-IO-problem-analysis/image.png)
It shows that the asynchronous version is 46% slower than the synchronous version. In this example, we are actually better off using rocksDB's synchronous api, as the transformed asynchronous version resulted in greater overhead.
One reason for this is that when we run a task using spawn_blocking, resulting in a switch from Tokio's worker thread to the blocking thread. This involves synchronizing data between the two threads and invalidating the CPU cache, making the operation relatively expensive.
Another reason to use the synchronous version is that our write operation only takes a few hundred microseconds, which is not truly a blocking operation. RocksDB writes the operation to the MemTable first and then asynchronously flushes it to disk via a background task, so the time taken is very short. For such short tasks, yielding to the runtime can cause two issues:
- The runtime can't effectively save CPU time even if it switches to another task in the meantime.
- Under high load, the runtime can experience increased latency and synchronization costs when tasks are sent to other worker threads.
You may wonder if using the synchronized version in this way creates a problem, since RocksDB suffers from write stalls and does not guarantee a stable latency for every write. Generally speaking, occasional blocking of the runtime does not significantly impact overall performance. For example, Tokio implements a work-stealing mechanism: if a worker thread is blocked, other worker threads can steal tasks from its work queue for execution. This alleviates blocking to some extent, especially for CPUs with more cores. Another example is async-std. It will generate a new thread for tasks that have been blocked for a longer period, which also mitigates the problem of occasional blocking in the runtime.
Calling RocksDB's synchronous API is only has some possibility of blocking, and the likelihood of this depends on the actual workload. When deciding whether to use synchronous blocking in the runtime, you should first evaluate the probability of blocking in your system. For example, in Xline, our main goal is to run on machines with modern SSDs, and Xline's design throughput is relatively low compare to RocksDB's maximum throughput. Therefore, RocksDB will almost never experience write stalls, and we could achieve the best average performance by calling the API synchronously in the runtime.
## Summary
Unfortunately, asynchronous runtime is not a silver bullet for all our IO problems. There's still much complexity in an asynchronous system. Better understanding the underlying mechanism can provide more tailored solutions.