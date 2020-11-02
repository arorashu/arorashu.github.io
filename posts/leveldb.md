
# What is level db

Level DB is a key value storage library written at Google. It provides an ordered mapping from 
string keys to string values. It is a pretty bare bone databse in the traditional sense. Compared to
other key valkue stores like MongoDB, this offers very little "features". I think it is part of their design goals, to keep it as simple as possible.


## Meta Features
1. Immediate consistency
2. Uses LSM trees as data structure

## Features
1. Keys and values are arbitrary byte arrays
2. Keys are ordered according to a user-specified comparator

## What is unique?

1. Very fast writes, independent of size
2. Implements Log Structured merge tree ([LSM Tress](https://en.wikipedia.org/wiki/Log-structured_merge-tree))

## Supported operations
1. Put
2. Delete
3. Get

## Supported advanced operations
1. Atomic batch operations
2. Snapshot
    - Consistent read only views over the entire state of the store

## LSM Trees vs B-Trees
1. 
