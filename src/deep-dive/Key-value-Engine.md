Key-value stores are used as stand-alone NoSQL systems but they are also used as a part of more complex pipelines and systems such as machine learning and relational systems.

B-trees and Log-Structured Merge-trees (LSM trees) are two of the most widely used data structures for organizing and storing data in data-intensive applications. However, each of them has its own trade-offs. The purpose of this paper is to compare these two data structures using a quantitative approach.

# Metrics

In general, there are three key metrics to measure the performance of a data structure: write amplification, read amplification, and spatial amplification. This section aims to describe these metrics.

For hard disk drives (HDDs), the cost of disk seek is enormous, such that the performance of random read/write is worse than that of sequential read/write. Therefore, the performance of sequential disk reads and writes is much better than that of random reads and writes. Even for SSDs, sequential read and write performance is better than random read and write.

## Write Amplification

Write amplification means that the actual amount of data written to the storage media is greater than the amount of data expected to be written.

Write amplification occurs because the database itself, in addition to storing data, also needs to store some metadata, such as indexes, wal logs, etc., to improve performance or crash consistency. In addition to metadata, write amplification can also occur on the storage media itself. For example, SSDs have their own garbage collection mechanism that can cause write amplification. Since the lifetime of flash-based storage devices is related to the number of erases, write amplification can reduce the lifetime of flash memory.

## Read Amplification

Read amplification is when the amount of data needed to be read per query is greater than the amount of data expected to be read.

Read amplification occurs because databases often require metadata, such as indexes, to be queried first. The use of caching can reduce read amplification. Also, note that the units of write amplification and read amplification are different. Write amplification measures how much more data is written than the application thinks, while read amplification counts the number of disk reads to execute a query.

## Space Amplification

Space amplification is when the data stored in a storage medium is larger than the data stored in a database application

# LSM Tree And B-Tree

In the [LSM tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree), data is organized into levels. The data at level 0 resides entirely in memory, while the rest of the levels reside on disk. New records are inserted into level 0. As more data is inserted, when level 0 exceeds a certain size threshold, it is merged into leve 1. If level 1 exceeds a certain size threshold, it is merged into level 2, and so on, with a limit on the size of each level. In order to perform a query on a specific key to get its associated value, a search must be performed in level 0 and also in each level.

[B-tree](https://en.wikipedia.org/wiki/B-tree) is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. The B-tree generalizes the binary search tree, allowing for nodes with more than two children.([2]) Unlike other self-balancing binary search trees, the B-tree is well suited for storage systems that read and write relatively large blocks of data, such as databases and file systems.

Generally speaking, a data structure can be optimized in at most two ways: read, write, or space amplification. This means that one data structure is unlikely to be better than another in all three. The LSM-tree has a better writer performance than the B+ tree, while its read performance is not as good as the B+ tree.

LSM Tree has better write performance than B+ Tree because the former has lower write amplification than the latter. B+ Tree indexes require at least two writes of data, one to the WAL and one to the page itself. LSMs can have greater write throughput than B+ Trees partly because they sometimes have lower write amplification (which requires the right configuration) and partly because they write compact SSTable files sequentially. LSM Trees can be compressed well enough to produce smaller files on the disk. The B+ Tree storage engine, on the other hand, generates some space fragmentation due to the paging mechanism.

The B+ Tree has better read performance compared to the LSM Tree because the former has lower read amplification than the latter. LSM Tree requires reading several different data structures with SSTable during the read process. In addition, since each key of the B tree exists in only one location in the index, the LSM tree storage engine, on the other hand, may have multiple copies of the same key in different segments. This also makes B-trees attractive in databases that need to provide strong transactional semantics, because in most relational databases, transactional isolation is achieved by using locks on key ranges. In a B-tree index, these locks can be attached directly to the tree.