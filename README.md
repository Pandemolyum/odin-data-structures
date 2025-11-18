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

Creates a balanced binary search tree given a number array, removing all duplicates from the array.

**Class Functions**
- `buildTree(data)` returns the level-0 root node with references to left and right children forming a balanced tree
- `insert(value, startNode = this.root)`, inserts a node with the given value in the tree. `startNode` should generally be left empty to take the value of the root node.
- `delete(value)` deletes a node with the given value from the tree
- `find(value)` returns the node with the given value or null if the value is not found
- `levelOrderForEach(callback, startNode = this.root)` traverses the tree in breadth-first level order and calls the callback function on each node as it traverses
- `inOrderForEach(callback, startNode = this.root)` traverses the tree in inorder depth-first level order and calls the callback on each node as it traverses
- `preOrderForEach(callback, startNode = this.root)` traverses the tree in preorder depth-first level order and calls the callback on each node as it traverses
- `postOrderForEach(callback, startNode = this.root)` traverses the tree in postorder depth-first level order and calls the callback on each node as it traverses
- `height(value)` returns the height of the specified value or null if the value if not found. Height is defined as the number of edges in the longest path from that node to a leaf node. A height of 0 means the specified value is a leaf node.
- `depth(value)` returns the depth of the specified value or null if the value is not found. Depth is defined as the number of edges in the path from that node to the root node. A depth of 0 means the specified value is the root node.
- `isBalanced()` checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.
- `rebalance()` rebalances an unbalanced tree. See `isBalanced()` function for a definition of balanced trees
- `prettyPrint(node, prefix = "", isLeft = true)` prints the tree in the console
