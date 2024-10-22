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

# v0.5.0

#### Features：

- [Feature]: Implemented the Compact feature, which includes the following two aspects (Read issue [#188](https://github.com/xline-kv/Xline/issues/188) for more details about compaction design):
  - Implemented historical version compaction feature. The compaction API is compatible with the etcd interface. Resolved in pr [#311](https://github.com/xline-kv/Xline/pull/311)
  - Implemented an automatic compaction mode, supporting both periodic Strategy and Revision Strategy. It is not enabled by default. Resolved in pr [#401](https://github.com/xline-kv/Xline/pull/401)
- [Feature]: Implement a Rust SDK for the Xline client (xline-client crate) to fully leverage the performance of CURP protocol. Currently, the SDK covers functionalities:
  - Watch: Implemented in pr #[321](https://github.com/xline-kv/Xline/pull/321)
  - Kv: Implemented in pr #[318](https://github.com/xline-kv/Xline/pull/318)
  - Maintenance: Implemented in pr #[323](https://github.com/xline-kv/Xline/pull/323)
  - Auth: Implemented in pr #[320](https://github.com/xline-kv/Xline/pull/320)
  - Lease: Implemented in pr #[319](https://github.com/xline-kv/Xline/pull/319)
  - Lock: Implemented in pr #[322](https://github.com/xline-kv/Xline/pull/322)
  - Compaction: Implemented in pr #[389](https://github.com/xline-kv/Xline/pull/389)
- [Feature]: Implement a command line tool for Xline, which is named xlinectl. Resolved in pr #[348](https://github.com/xline-kv/Xline/pull/348)
- [Feature]: Support single node cluster #[335](https://github.com/xline-kv/Xline/issues/335)
- [Feature]: Support multiplatform for Xline. Read #[doc](https://github.com/xline-kv/Xline/tree/master/doc/quick-start) for more details.
- [Feature]: Support dns resolution for Xline cluster #[351](https://github.com/xline-kv/Xline/issues/351)
- [Feature]: Support grpc health checking protocol, resolved in pr #[385](https://github.com/xline-kv/Xline/pull/385)
- [Feature]: Add madsim simulation in Curp tests #[282](https://github.com/xline-kv/Xline/issues/282)

#### Fix Bugs

- [Bug]: Madsim Curp integration tests sometimes fail #[361](https://github.com/xline-kv/Xline/issues/361)
- [Bug]: lease may not synced in lease server #[343](https://github.com/xline-kv/Xline/issues/343)
- [Bug]: EventListener will lose event since it's not cancellation safe. #[339](https://github.com/xline-kv/Xline/issues/339)
- [Bug]: Resolve failing tests related to serialized size. #[259](https://github.com/xline-kv/Xline/issues/259)

#### Contributors

We'd like to thank all the contributors who worked on this release!

[@liubog2008](https://github.com/liubog2008)

# v0.6.0

#### New Features

- [Feature]: Add membership change mechanism for CUPR consensus Protocol (Read design doc [#306](https://github.com/xline-kv/Xline/issues/306) for more details)
- [Feature]: Implement cluster server and client [#464](https://github.com/xline-kv/Xline/pull/464), [#465](https://github.com/xline-kv/Xline/pull/465)
- [Feature]: Implement the graceful shutdown feature.
- [Feature]: Implement the xlinctl to communicate with the xline cluster. Currently, the xlinectl covers functionalities:
  - Compaction and member command: Implemented in pr [#484](https://github.com/xline-kv/Xline/pull/484)
  - Txn, watch and lock command: Implemented in pr [#428](https://github.com/xline-kv/Xline/pull/484)
  - Role command: Implemented in pr [#427](https://github.com/xline-kv/Xline/pull/427)
  - User command: Implemented in pr [#426](https://github.com/xline-kv/Xline/pull/426)
  - Snapshot and auth command: Implemented in pr [#425](https://github.com/xline-kv/Xline/pull/425)
  - Delete and lease command: Implemented in pr [#424](https://github.com/xline-kv/Xline/pull/424)

#### Bug Fixes

- [Bug]: benchmark client cannot connect to server [#462](https://github.com/xline-kv/Xline/pull/462)
- [Bug]: remove stop in simulation tests [#458](https://github.com/xline-kv/Xline/pull/458)
- [Bug]: execute out of order [#454](https://github.com/xline-kv/Xline/pull/454)
- [Bug]: check the password on leader [#435](https://github.com/xline-kv/Xline/pull/435)
- [Bug]: remove recovery of uncommitted pool [#419](https://github.com/xline-kv/Xline/pull/419)
- [Bug]: CURP TLA+ quorum size calculation & property check [#418](https://github.com/xline-kv/Xline/pull/418)
- [Bug]: fix propose doesn't handle SyncedError [#407](https://github.com/xline-kv/Xline/pull/407)

#### Refactor

- [Refactor]: reduce code duplication [#407](https://github.com/xline-kv/Xline/pull/407)
- [Refactor]: Take into account the interleaving states of a request broadcast in TLA+ [#429](https://github.com/xline-kv/Xline/pull/429)
- [Refactor]: Refine the bench client implementation [#496](https://github.com/xline-kv/Xline/pull/496)
- [Refactor]: Simplified the error handling logic [#480](https://github.com/xline-kv/Xline/pull/480)
- [Refactor]: Improve readability of bootstrap errors [#432](https://github.com/xline-kv/Xline/pull/432)
- [Refactor]: Imporve command serialization in execution and after-sync [#421](https://github.com/xline-kv/Xline/pull/421), [#422](https://github.com/xline-kv/Xline/pull/422)

#### Contributors

- [@EAimTY](https://github.com/EAimTY)
- [@MarkGaox](https://github.com/MarkGaox)
- [@Kikkon](https://github.com/Kikkon)

Note：  
Known issue: If the cluster is shut down immediately after adding a member, the leader node may not shut down properly, continuously trying to send entries to the shut-down new node. Read issue [#526](https://github.com/xline-kv/Xline/issues/526) for more details.

# v0.6.1

#### Bug Fixes

- [Bug]: Fixed a bug causing panic during the update node process. [issue #531](https://github.com/xline-kv/Xline/issues/531)
- [Bug]: Fixed a bug causing panic during the CI process due to reading state. [issue #527](https://github.com/xline-kv/Xline/issues/527)
- [Bug]: Fixed a bug in the previous version where immediately shutting down the cluster after executing "member add" would cause the leader to fail to shut down properly. [issue #526](https://github.com/xline-kv/Xline/issues/526)
- [Bug]: Fixed an issue in TXN where the conflict detection process would ignore the key of child requests. [issue #470](https://github.com/xline-kv/Xline/issues/470)
- [Bug]: Fixed a panic issue in watch caused by closing the channel. [issue #370](https://github.com/xline-kv/Xline/issues/370)
  - pr 576: [fix: fix ce event tx logs](https://github.com/xline-kv/Xline/pull/576)
  - pr 556: [[Fix]: kv update channel panic](https://github.com/xline-kv/Xline/pull/556)
- [Bug]: Changed the calculation method for the cluster version to a hash to avoid misjudgments. [pr #590](https://github.com/xline-kv/Xline/pull/590)
- [Bug]: Fixed a bug that caused the compact operation to behave abnormally in specific scenarios. [pr #570](https://github.com/xline-kv/Xline/pull/570)

#### Refactor

- [Refactor]: Refactored the implementation of the Curp client, reducing code complexity. ：
  - pr 582: [Refactor/curp client tests suits](https://github.com/xline-kv/Xline/pull/582)
  - pr 584: [Refactor/curp client retry](https://github.com/xline-kv/Xline/pull/584)
  - pr 585: [Refactor/replace curp client](https://github.com/xline-kv/Xline/pull/585)
- [Refactor]: Removed some command-related data structures from xline and xline-client. [pr #469](https://github.com/xline-kv/Xline/pull/469)
# v0.7.0
#### New Features
- [Feature]CURP WAL (Write-Ahead-Log) implementation：We designed a Write-Ahead-Log to persist log entries for curp.
- [Feature]Deduplication：Implements command deduplication using the exactly-once semantics from the [RIFL](https://web.stanford.edu/~ouster/cgi-bin/papers/rifl.pdf) paper.
- [Feature]: Snapshot Restore [#630](https://github.com/xline-kv/Xline/issues/630)
- [Feature]: Interface of maintenance server [#543](https://github.com/xline-kv/Xline/issues/543)
- [Feature]: Support run with tls [#328](https://github.com/xline-kv/Xline/issues/328)
####  Refactor
- [Refactor]: Add a session structure to renew lock lease automatically [#684](https://github.com/xline-kv/Xline/issues/684)
- [Refactor]: startup process [#629](https://github.com/xline-kv/Xline/issues/629)
- [Refactor]: Refactor the GC of speculative pool [#439](https://github.com/xline-kv/Xline/issues/439)
- [Refactor]:New command execution logic: We removed the cmd workers and related command execution logic. Now Xline will use serial execution (with batch) to prevent lock contention.
- [Refactor]: Garbage Collection: We refactored the garbage collection logic based on the dedup implementation.
- [Refactor]:Client Propose Optimization: We refactored the curp client to use gRPC stream to send a propose to the cluster. This reduces the load of the gRPC server and improves the overall performance.
- [Refactor]: Conflict Detection: We removed the conflict checked mpmc. Now Xline will use the conflict pools (speculative pool and uncommitted pool) to detect command conflicts.
- [Refactor]: Read Index: We implemented the Read Index mechanism from the Raft paper for read-only commands. Replacing the previous Read State implementation.
- [Refactor]: xline-client Refactor: We switched to a more intuitive user interface for the xline-client crate.
- [Refactor]: Various performance optimizations
#### Bug Fixes
- [Bug]: Implement ReadIndex [#870](https://github.com/xline-kv/Xline/issues/870)
- [etcdapi] [Bug]: Repeated revision [#848](https://github.com/xline-kv/Xline/issues/848)
- [Bug]: The test case curp::it server::shutdown_rpc_should_shutdown_the_cluster failed [#774](https://github.com/xline-kv/Xline/issues/774)
- [Bug]: Xline will loss event when using watch feature [#677](https://github.com/xline-kv/Xline/issues/677)
- [Bug]: The xlinectl won't renew the lease of the lock key [#664](https://github.com/xline-kv/Xline/issues/664)
- [Bug]: Failed to add a new member node4 to a three-nodes xline cluster [#661](https://github.com/xline-kv/Xline/issues/661)
- [Refactor]: read-only command during revision generation [#502](https://github.com/xline-kv/Xline/issues/502)
- [Bug]: Read different values in execute during read state [#501](https://github.com/xline-kv/Xline/issues/501)
- [Bug]: sync txn request does not execute in the order of child request [#498](https://github.com/xline-kv/Xline/issues/498)
- [Bug]: Read State [#497](https://github.com/xline-kv/Xline/issues/497)
- [Bug]: revision generation [#491](https://github.com/xline-kv/Xline/issues/491), [#848](https://github.com/xline-kv/Xline/issues/848)
- [Bug]: requests in a single txn do not execute in sequence [#471](https://github.com/xline-kv/Xline/issues/471)
- [Bug]: batch_index in raw_curp will overflow eventually [#368](https://github.com/xline-kv/Xline/issues/368)
- [Bug]: Fix GC may break the CURP durability [#159]https://github.com/xline-kv/Xline/issues/159
#### Known Issues
- During benchmark if the cluster is under high load, the cluster may sometimes not be able to make progress due to deduplication mechanism.
#### Breaking Changes
- etcd compative APIs will now use 2-RTTs operations to prevent revision generation issues.
#### Contributors
We'd like to thank all the contributors who worked on this release!


- [@themanforfree](https://github.com/themanforfree)
- [@iGxnon](https://github.com/iGxnon)
- [@Phoenix500526](https://github.com/Phoenix500526)
- [@bsbds](https://github.com/bsbds)