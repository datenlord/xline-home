Xline is a high-performance distributed key-value storage engine for multi-cluster. It can provide unified data management for multi-cluster scenarios, making mutual access, discovery, and modification simple and convenient. It also provides KV interface, Multi-Version Concurrency Control and is compatible with etcd and K8S.

Xline is the first geo-distributed consistency management service based on CURP(a WAN consensus protocol, read the paper for more details). It addresses the challenges of convergence and consistency across clouds.

# Architecture

**An Xline instance consists of the following layers:**

- Client Layer: Provides a simple and easy-to-use API for clients to use, which can greatly reduce the complexity of using Xline for business. Xline clients in different languages will be implemented in the later release, and currently etcdctl can be used to initiate requests because Xline APIs are compatible with etcd.
- Access Layer: The access layer mainly includes the communication protocol between client to server or server to server. Xline API is based on gRPC protocol.
- CURP Protocol Layer: The CURP protocol layer implements the core algorithm features, such as leader election, log replication, fast-path and slow-path, which are used to ensure data consistency among Xline multi-node and improve service availability. CURP protocol is the cornerstone and highlight of Xline.
- Functional Logic Layer: This layer implements Xline business logic, including the typical KV Server, Auth Server, Lease Server and Watch Server, etc. Client sends requests to Xline Server through the access layer, and Xline Server dispatches the requests to specific servers for execution.
- Storage Layer: This layer contains two components, Index and DB, where Index is based on BTreeMap while DB is mainly responsible for persistent storage of data. At present, Xline is still in the early stage of development, so DB is mainly implemented based on memory. We will introduce persistent storage in the next release.

![image](/xline-home/docs/Get-Started/image1.png)

For more information about the Architecture of Xline, read [Xline Architecture Details](/xline-home/#/docs/Xline-Architecture-Details).

# Xline In 5 Minutes

1. Download binary from [release](https://github.com/datenlord/Xline/releases) page.
2. Use the following command to start cluster:

```bash
xline  --name node1 --members node1=172.20.0.3:2380,172.20.0.3:2381,node2=172.20.0.4:2380,172.20.0.4:2381,node3=172.20.0.5:2380,172.20.0.5:2381     --storage-engine rocksdb  --data-dir /usr/local/xline/data-dir  --client-listen-urls=http://172.20.0.3:2379  --peer-listen-urls=http://172.20.0.3:2380,http://172.20.0.3:2381  --client-advertise-urls=http://172.20.0.3:2379 --peer-advertise-urls=http://172.20.0.3:2380,http://172.20.0.3:2381

xline  --name node2 --members node1=172.20.0.3:2380,172.20.0.3:2381,node2=172.20.0.4:2380,172.20.0.4:2381,node3=172.20.0.5:2380,172.20.0.5:2381     --storage-engine rocksdb  --data-dir /usr/local/xline/data-dir  --client-listen-urls=http://172.20.0.3:2379  --peer-listen-urls=http://172.20.0.3:2380,http://172.20.0.3:2381  --client-advertise-urls=http://172.20.0.3:2379 --peer-advertise-urls=http://172.20.0.3:2380,http://172.20.0.3:2381

xline  --name node3 --members node1=172.20.0.3:2380,172.20.0.3:2381,node2=172.20.0.4:2380,172.20.0.4:2381,node3=172.20.0.5:2380,172.20.0.5:2381     --storage-engine rocksdb  --data-dir /usr/local/xline/data-dir  --client-listen-urls=http://172.20.0.3:2379  --peer-listen-urls=http://172.20.0.3:2380,http://172.20.0.3:2381  --client-advertise-urls=http://172.20.0.3:2379 --peer-advertise-urls=http://172.20.0.3:2380,http://172.20.0.3:2381
```

3. Download or build etcdctl from [etcd](https://github.com/etcd-io/etcd) project.
4. Use etcdctl to operate the cluster:

```bash
$ etcdctl --endpoints=http://127.0.0.1:2379 put foo bar
$ etcdctl --endpoints=http://127.0.0.1:2379 get foo
```
