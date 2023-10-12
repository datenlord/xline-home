---
  cover: /xline-home/blog/Mechanism-and-Implementation-of-Lease/cover.png
  author:
    name: themanforfree
    url: https://github.com/themanforfree
    img_url: https://avatars.githubusercontent.com/u/56149350?v=4
  read_time: 20
---

Xline is an open source distributed KV storage engine for managing small amounts of critical data, with the aim of high performance data access and strong consistency across data centers. Xline provides a series of etcd-compatible access interfaces, including KV, Watch, Lease, and more. In this article, we will focus on the Lease interface.

---

## 1. Introduction

Xline is an open source distributed KV storage engine for managing small amounts of critical data, with the aim of high performance data access and strong consistency across data centers. Xline provides a series of etcd-compatible access interfaces, including KV, Watch, Lease, and more. In this article, we will focus on the Lease interface.

Lease is a lease mechanism between client and server. Similar to the car rental service in our real life, when we need to use a car, we can apply for a lease from the car rental company, the car rental company will assign a car to us, and guarantee that the car will not be assigned to other people during the validity period agreed between us and the car rental company. If we want to use it for a longer period of time, we can renew the lease to the car rental company. If we no longer want to use the car, we can either return and cancel it, or wait for the lease to expire and return it automatically.

The use of Lease in Xline is very similar to the real life car rental service. The client can apply for a lease from the server, the server will then ensure that the lease will not be revoked during the validity period. The client can also end the lease early or extend the TTL of lease through the corresponding interface. Unlike real-life car rental, we can bind some key-values to the lease, while they will be deleted with the expiration of the lease.

According to the ability of Lease introduced above, we can use Lease to realize our purpose in many scenarios, the following are some common Lease application scenarios:
Distributed locks: Distributed locks are realized through several mechanisms, while Lease play a role in avoiding deadlocks in distributed locks. When a client requests for a distributed lock, it creates a lease and renews the lease continuously, while also writes key-value and attaches it to the lease. This key-value represents the occupancy state of the distributed lock, and if the client occupying the lock is unable to release the lock actively due to a failure, the Lease mechanism ensures that the corresponding key-value will be deleted automatically to release the current lock after the expiration of the lease.
Service Registry: A lease is created when registering a new service, and written the key-value of service-related information with lease. During the survival of the service, the service will renew its lease continuously. If the lease cannot be renewed automatically after the service fails, the corresponding key-value will be deleted automatically, and the corresponding service will be deregistered in the registry center.
Authorization Management in Distributed Systems: Clients apply for a lease to gain permissions for resources, if the client loses connection with the server, or if the lease expires due to failure to renew the lease in time, the client loses the corresponding permissions.

## 2. Architecture

![Image](/xline-home/blog/Mechanism-and-Implementation-of-Lease/image1.PNG)

The above figure is a simple architecture diagram of Lease implementation. There are two ways for an external client to send a request to the Xline cluster. One is to directly broadcast the request to all nodes in the cluster through the Curp protocol. After the Curp module reaches a consensus, it applies the request to the state machine, which is to write the request to the storage layer.

Another way is for the client to directly send the request to the LeaseServer of one of the nodes in the cluster, which is also the service request method that is compatible with etcd. After the request reaches the LeaseServer, there will be two different processing paths, most of the requests will be broadcasted to all the nodes in the cluster through the Curp client bound to the server, and the remaining small number of requests may only be handled by some of the nodes, which will be forwarded to the LeaseServer of the specific nodes and applied to the state machine.

## 3. Source Code Analysis

### Source Code Organization

The Lease-related source code is mainly stored in the following files, which are roughly organized into three sections:

1. RPC Definitions:

- xlineapi/proto/rpc.proto: rpc interface definitions for each Server within Xline, including the LeaseServer interface definition.
- xlineapi/proto/lease.proto: rpc message definition for Lease.

2. LeaseServer implementation:

- xline/src/server/lease_server.rs: Responsible for providing the implementation of the Lease RPC service, the main purpose is to provide etcd compliant interface.If the client send the propose directly through the external curp, this interface can be omitted, while some of the requests that do not go through the consensus protocol must be processed through the LeaseServer.

3. LeaseStore implementation:

- xline/src/storage/lease_store/lease.rs: Defines the Lease data structure, which is used to store Lease-related information, such as all the keys bound on the Lease, the expiration time of the Lease, the remaining TTL of the Lease, etc. It also implements some practical methods for it.
- xline/src/storage/lease_store/lease_queue.rs: Defines LeaseQueue and related methods. LeaseQueue is a priority queue consisting of lease IDs and lease expiration times, while a background-resident task will capture all the expired lease IDs through this structure at regular intervals.
- xline/src/storage/lease_store/lease_collection.rs: Defines the LeaseCollection and related methods. The LeaseCollection is a collection of the core data structures of a lease, providing the core capabilities of the lease mechanism. The structure contains three parts: lease_map saves all the lease structures; item_map caches the key to lease ID mapping; and expired_queue manages the lease expiration time. expired_queue is only used on the leader node, and is empty on other nodes.
- xline/src/storage/lease_store/mod.rs: Definition and method implementation of LeaseStore. It is responsible for providing the storage layer abstraction for lease and the storage layer interface for all lease related operations externally. Its inner part contains LeaseCollection and some data structures which are shared with KvStore.

### Lease Creation

If you want to use a lease, you must create a lease first, and when doing so, you need to use the LeaseGrant interface provided by LeaseServer. The LeaseGrant RPC is quite straightforward, which is to assign a lease ID, and submit the request to the consensus protocol through propose interface?. Once consensus is reached, the request is executed in the LeaseStore.

LeaseStore will create and insert a new lease in LeaseCollection. The core code logic is as follows:

```rust
...
if is_leader {
    let expiry = lease.refresh(Duration::ZERO);
    let _ignore = inner.expired_queue.insert(lease_id, expiry);
} else {
    lease.forever();
}
let _ignore = inner.lease_map.insert(lease_id, lease.clone());
...
```

Note that if the current node is the leader node, it also needs to manage the lease's expiration time. Therefore, it must calculate the expiration time of the lease through the refresh method and insert it into the expired_queue. The other nodes do not need this step, they just need to insert the new lease into the lease_map.

After the lease is created, the server returns a response to the client containing the lease ID.

### Using Lease

![Image](/xline-home/blog/Mechanism-and-Implementation-of-Lease/image2.png)

After getting the lease ID, the client can use the lease through the lease ID. When putting a pair of key values, lease ID can be attached. When this Put request is applied to the state machine, in addition to writing the key-value directly to the index and DB of the KvStore, it will detach the current key from the old lease by the detach method provided by the LeaseCollection, and attach the key that needs to be put to the new lease ID by attach.

```bash
pub(crate) fn attach(&self, lease_id: i64, key: Vec<u8>) -> Result<(), ExecuteError> {
    let mut inner = self.inner.write();
    let Some(lease) = inner.lease_map.get_mut(&lease_id) else {
        return  Err(ExecuteError::lease_not_found(lease_id));
    };
    lease.insert_key(key.clone());
    let _ignore = inner.item_map.insert(key, lease_id);
    Ok(())
}
```

The implementation of attach is to find the corresponding lease by the lease ID, attach the key to the lease, and add the mapping of the key to the lease ID to the item_map. Detach is the opposite of attach, it removes the content inserted when attaching.

After the above process, we have successfully associated the key with the lease ID. If the lease is actively revoked or times out, the lease and all the keys associated with it will be deleted.

## Active Lease Deletion

To delete a lease, you need to use the LeaseRevoke interface, which is basically the same as LeaseGrant in LeaseServer. Both of them pass the request to the consensus protocol for processing, while the only difference is that LeaseRevoke doesn't need to assign a lease ID.

```rust
let del_keys = match self.lease_collection.look_up(req.id) {
    Some(l) => l.keys(),
    None => return Err(ExecuteError::lease_not_found(req.id)),
};
if del_keys.is_empty() {
    let _ignore = self.lease_collection.revoke(req.id);
    return Ok(Vec::new());
}

// delete keys ...

let _ignore = self.lease_collection.revoke(req.id);
```

When LeaseRevoke is executed, it first tries to find out if the lease has any associated keys, if not, it can directly remove the lease through the revoke method on the LeaseCollection. If there are associated keys, it needs to remove all associated keys from the KV Store and clean up the relationship between these keys and the lease ID in the LeaseCollection before you can revoke the lease from the LeaseCollection.

### Lease expiration

![Image](/xline-home/blog/Mechanism-and-Implementation-of-Lease/image3.png)

The Lease expiration process is shown in the above figure, which omits the consensus part. When initializing LeaseServer, a background resident revoke_expired_leases_task is created, the main code of this task is as follows:

```bash
loop {
    // only leader will check expired lease
    if lease_server.lease_storage.is_primary() {
        for id in lease_server.lease_storage.find_expired_leases() {
            let _handle = tokio::spawn({
                let s = Arc::clone(&lease_server);
                async move {
                    let  request = tonic::Request::new(LeaseRevokeRequest { id });
                    if let Err(e) = s.lease_revoke(request).await {
                        warn!("Failed to revoke expired leases: {}", e);
                    }
                }
            });
        }
    }
    time::sleep(DEFAULT_LEASE_REQUEST_TIME).await;
}
```

On the node responsible for managing Lease expiration time, this task will periodically captures all the expired lease IDs through find_expired_leases, and calls the lease_revoke interface on the lease server to delete the expired Leases, utilizing the same interface as clients use to actively delete Leases.
find_expired_leases is a core method in LeaseCollection, and its implementation is as follows:

```rust
pub(crate) fn find_expired_leases(&self) -> Vec<i64> {
    let mut expired_leases = vec![];
    let mut inner = self.inner.write();
    while let Some(expiry) = inner.expired_queue.peek() {
        if *expiry <= Instant::now() {
            #[allow(clippy::unwrap_used)] // queue.peek() returns Some
            let id = inner.expired_queue.pop().unwrap();
            if inner.lease_map.contains_key(&id) {
                expired_leases.push(id);
            }
        } else {
            break;
        }
    }
    expired_leases
}
```

When a lease is created, the expiration time of the lease is already calculated and inserted into the expired_queue. When calling find_expired_queue, the process continuously attempts to extract the expired leases from the head of the priority queue until it encounters the first one that has not yet expired. It then returns all the lease ID obtained in this process.

### Lease Renewal

If you want the created lease to last longer, you need to maintain a stream between the client and the server, where the client sends LeaseKeepAlive requests to the server at regular intervals. Unlike the previous requests, LeaseKeepAlive requests do not need to go through the consensus protocol because they rely on the expiration time of a lease that exists only on the leader node, so only the leader node can process LeaseKeepAlive requests, while the follower node forwards the request to the leader node for processing. The forwarding logic can be found in the source code of lease_server.rs.
After the stream is established between the leader and the client, whenever the leader receives a lease ID from the stream, it will renew the lease. The final renewal logic is realized by the renewal method provided by LeaseCollection. This method is defined as follows:

```bash
pub(crate) fn renew(&self, lease_id: i64) -> Result<i64, ExecuteError> {
    let mut inner = self.inner.write();
    let (expiry, ttl) = {
        let Some(lease) = inner.lease_map.get_mut(&lease_id) else {
            return Err(ExecuteError::lease_not_found(lease_id));
        };
        if lease.expired() {
            return Err(ExecuteError::lease_expired(lease_id));
        }
        let expiry = lease.refresh(Duration::default());
        let ttl = lease.ttl().as_secs().cast();
        (expiry, ttl)
    };
    let _ignore = inner.expired_queue.update(lease_id, expiry);
    Ok(ttl)
}
```

Renew will first check whether the corresponding lease has expired or not. If not, it will recalculate the expiration time, and then update its order in the expired_queue.
As long as the connection between the client and the server is not interrupted, the client will continue to send LeaseKeepAlive requests to the server via stream, preventing the lease from timing out. The primary application scenarios for leases, as mentioned in the previous section, almost always use this feature to determine whether the client is running normally.

### Lease information reading

Lease has two reading interfaces. One is LeaseTimeToLive, which will read the detailed information of a lease, including its expiration time. Same as LeaseKeepAlive, because the expiration time only exists in the leader node, so the request needs to be forwarded to only the leader for processing.
Another reading interface is LeaseLeases, which lists all the lease IDs in the system. This interface doesn't need information about the lease expiration time, so it can be handed over to the consensus protocol directly, which makes the processing in LeaseServer similar to that of LeaseGrant and LeaseRevoke. We wouldn’t go into further details here.
The ability of LeaseTimeToLive and LeaseLeases to read information is finally realized by LeaseCollection, the source code is as follows:

```rust
pub(crate) fn look_up(&self, lease_id: i64) -> Option<Lease> {
    self.inner.read().lease_map.get(&lease_id).cloned()
}

pub(crate) fn leases(&self) -> Vec<Lease> {
    let mut leases = self
        .inner
        .read()
        .lease_map
        .values()
        .cloned()
        .collect::<Vec<_>>();
    leases.sort_by_key(Lease::remaining);
    leases
}
```

## 4. Summary

In this article, we have introduced Lease, an important interface of Xline, which allows users to realize the on-time expiration of a set of keys and renew the lease through KeepAlive interface. This feature also allows the server to monitor the client's status. Relying on these features of the Lease mechanism, many typical application scenarios have been born, such as distributed locks, service registries, authorization management and so on, as described in this article.
The article also explains how users can utilize the Lease interface, and outlines the realization of key functionalities within this process. If you want to learn more about the detailed code, you can also refer to our open source repository: https://github.com/xline-kv/Xline .

Xline is a geo-distributed KV storage for metadata management. the Xline project is written in Rust, and you are welcome to participate in our open source project!

GitHub link:  
https://github.com/xline-kv/Xline  
Xline official website: www.xline.cloud  
Xline Discord:  
https://discord.gg/XyFXGpSfvb
