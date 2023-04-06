# V0.1.0

Features:

1. Support major etcd APIs, including KV, Watch, and Auth services. (the rest of etcd APIs, like the Lease API and the Lock API, will be covered in the next version).
2. Basic implementation of the CURP protocol.
3. Basic Xline client.
4. Benchmark tool.

# V0.2.0

Features:

1. Enable Xline to boot up from the config file xline_server.conf.
2. Support ETCD APIs, like the lease API and the lock API.
3. Enable the recovery mechanism in the CURP module.
4. Add ETCD APIs compatibility test (test report: (report)[./VALIDATION_REPORT.md]).

Fix Bugs:

1. Fix panic in the benchmark.
2. Fix the issue that modifies kv pairs will fail after watching them in etcdctl.

# V0.3.0

Features:

1. Implement a persistent storage layer to enable durability, including:

- Implement a storage engine layer to abstract the concrete storage engine, like rocksdb, and enable upper layer storage function.
- Enable recover logic for curp and xline.

Fix Bugs:

1. Fix Concurrent cmd order bug.
