# Xline API

The current version of Xline implements some etcd-compatible APIs, such as KV API, Auth API, Watch API and so on. In the next release, we will further implement the remaining etcd APIs (v0.3~v0.5) ，such as Maintenance, Lease, and provide a client in different languages (v0.6~v0.8). Read the [roadmap](https://github.com/datenlord/Xline#roadmap) for more details.

Since Xline is fully compatible with etcd interfaces, you can use etcdctl to interact with Xline cluster in the current version. etcdctl can be used as described in the documentation. For more information, please refer to the [documentation](https://github.com/etcd-io/etcd/tree/main/etcdctl) on how to use etcdctl. Read the etcd-compatible API validation test report for more details.