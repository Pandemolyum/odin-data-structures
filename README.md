# odin-data-structures
A repo made as part of The Odin Project containing classes for the following data structures:
- [Linked List](#linked-list)
- [Hashmap](#hashmap)
- [Binary Search Tree](#binary-search-tree)

## Linked List
[Project Instructions](https://www.theodinproject.com/lessons/javascript-linked-lists)

**Class Functions**
- `append(value)` adds a new node containing value to the end of the list
- `prepend(value)` adds a new node containing value to the start of the list
- `size()` returns the total number of nodes in the list
- `head()` returns the first node in the list
- `tail()` returns the last node in the list
- `at(index)` returns the node at the given index
- `pop()` removes the last element from the list
- `contains(value)` returns true if the passed in value is in the list and otherwise returns false.
- `find(value)` returns the index of the node containing value, or null if not found.
- `toString()` represents LinkedList objects as strings, so they can be printed out and previewed in the console. The format is: ( value ) -> ( value ) -> ( value ) -> null
- `insertAt(value, index)` inserts a new node with the provided value at the given index.
- `removeAt(index)` removes the node at the given index.

## Hashmap
[Project Instructions](https://www.theodinproject.com/lessons/javascript-hashmap)

This hashmap only handles string type keys. It dynamically expands as its size grows, maintaining a load factor of 0.75 and starting at a capacity of 16. When the size of the hashmaps reaches capacity * load factor, its capacity doubles. The capacity represents the number of buckets in the hashmap.

**Class Functions**
- `hash(key)` hashes strings
- `set(key, value)` records a key-value pair in a linked list
- `get(key)` retrieves the value of a key from the hash map
- `has(key)` returns true if the key exists in the hash map and false otherwise
- `remove(key)` removes the specified key from the hash map
- `getLength()` returns the number of keys stored in all buckets of the hashmap
- `clear()` removes all keys from all buckets of the hash map
- `keys()` returns an array containing all the keys inside the hash map
- `values()` returns an array containing all the values inside the hash map
- `entries()` returns an array containing each key-value pair as an array inside an array

## Binary Search Tree
[Project Instructions](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

**Class Functions**
