# v0.1.0
#### What is it?
`Xline` is a geo-distributed KV store for metadata management, which is based on the `Curp` protocol.
#### Why make it?
Existing distributed KV stores mostly adopt the `Raft` consensus protocol, which takes two RTTs to complete a request. When deployed in a single data center, the latency between nodes is low, so it will not have a big impact on performance. However, when deployed across data centers, the latency between nodes may be tens or hundreds of milliseconds, at which point the `Raft` protocol will become a performance bottleneck. The `Curp` protocol is designed to solve this problem. It can reduce one RTT when commands do not conflict, thus improving performance.
#### What does it provide?
- Etcd Compatible API
  - `Kv` service
  - `Watch` service
  - `Auth` service
- basic implementation of the `Curp` protocol
- basic `Xline` client (use `Curp` directly)
- benchmark tool
#### Usage
[Usage doc](https://github.com/datenlord/Xline/blob/v0.1.0/USAGE.md)
#### Note
In this release, we only provide binary files for X86_64 linux. Other platforms need to be compiled by yourself. we will add more support in the future.
#### Links
GitHub: https://github.com/datenlord/Xline  
Paper of Curp: https://www.usenix.org/system/files/nsdi19-park.pdf

# v0.2.0
#### Features:
- Enable Xline to boot up from the config file xline_server.conf ([#145](https://github.com/datenlord/Xline/pull/145))
- Support ETCD APIs, like the lease API and the lock API ([#142](https://github.com/datenlord/Xline/pull/145), [#153](https://github.com/datenlord/Xline/pull/145))
- Enable the recovery mechanism in the CURP module ([#146](https://github.com/datenlord/Xline/pull/145))
- Add ETCD APIs compatibility test (test report: (report)[./VALIDATION_REPORT.md])
#### Fix Bugs
- Fix panic in the benchmark ([#123](https://github.com/datenlord/Xline/pull/123))
- Fix the issue that modifies kv pairs will fail after watching them in etcdctl ([#148](https://github.com/datenlord/Xline/pull/123))

# v0.3.0
#### Features:
Implement a persistent storage layer to enable durability, including:
Implement a storage engine layer to abstract the concrete storage engine, like rocksdb,
and enable upper layer storage function ([#185](https://github.com/datenlord/Xline/pull/185), [#187](https://github.com/datenlord/Xline/pull/187))
Enable recover logic for curp and xline ([#194](https://github.com/datenlord/Xline/pull/194), [#184](https://github.com/datenlord/Xline/pull/194))
#### Fix Bugs:
Fix concurrent cmd order bug ([#197](https://github.com/datenlord/Xline/issues/197))

# v0.4.0
#### Features：
1. Introduce batching mechanism to improve network bandwidth utilization
2. Implement the snapshot feature for CURP consensus protocol,
3. Implement the snapshot relevant API，which is compatible with etcdctl. The rest of other APIs in etcdctl maintenance will be implemented in the future.
#### Fix Bugs：
1. Fix a bug that commands will execute out of order in some concurrent cases (issue [#197](https://github.com/datenlord/Xline/issues/197)), resolve in the pr [#195](https://github.com/datenlord/Xline/issues/195)
2. Fix a bug that the gc task will panic during benchmark(issue [#206](https://github.com/datenlord/Xline/issues/206)), resolve in the pr [#210](https://github.com/datenlord/Xline/issues/210)
3. Fix a bug that the lock feature will work abnormally in some cases(issue [#209](https://github.com/datenlord/Xline/issues/209)), resolve in the pr [#212](https://github.com/datenlord/Xline/issues/212)
4. Fix a bug that some concurrent put requests will get wrong revisions (issue [#209](https://github.com/datenlord/Xline/issues/212)), resolve in the pr [#238](https://github.com/datenlord/Xline/issues/238)
#### Benchmark:
Since we implemented the persistence feature for xline in v0.3.0, we have re-benchmarked xline in this release. The benchmark report can be viewed in the Performance Comparison section in our README file.

# v0.4.1
#### Features
- Watch Progress Notify [#309](https://github.com/datenlord/Xline/issues/309)
#### Refactors
- Sharing state between CurpServer and CurpClient [#299](https://github.com/datenlord/Xline/issues/299)
- Refactor the XlineServer [#293](https://github.com/datenlord/Xline/issues/293)
- Refactor curp fast read implementation [#270](https://github.com/datenlord/Xline/issues/270)
- Improve the read and write logic for the RocksSnapshot [#263](https://github.com/datenlord/Xline/issues/263)
- Refactor the watch server implementation [#253](https://github.com/datenlord/Xline/issues/253)
- Refactor the dependencies of lease server [#251](https://github.com/datenlord/Xline/issues/251)
#### Fix Bugs
- Test_kv_authorization block [#291](https://github.com/datenlord/Xline/issues/291)
- The background command workers will panic in the integration test "recovery_after_compaction" [#285](https://github.com/datenlord/Xline/issues/285)
- Handle_propose in raw_cup will panic when try notify events [#280](https://github.com/datenlord/Xline/issues/280)
- Watch prev_kv [#277](https://github.com/datenlord/Xline/issues/277)