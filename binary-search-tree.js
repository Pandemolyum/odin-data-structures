class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(arr);
    }

    // Returns the level-0 root node with references to left and right
    // children forming a balanced tree
    buildTree(data) {
        if (data.length === 0) {
            return new Node(null);
        }

        data.sort((a, b) => a - b); // Sort the array in ascending order
        const newData = data.filter((num, i) => num != data[i - 1]); // Remove duplicates

        // Find middle of array
        const rootNodeIndex = Math.floor((newData.length - 1) / 2);
        const rootNode = new Node(newData[rootNodeIndex]);

        // Build left side of the tree
        this.#buildBalancedTree(newData.slice(0, rootNodeIndex), rootNode);

        // Build right side of the tree
        this.#buildBalancedTree(newData.slice(rootNodeIndex + 1), rootNode);

        return rootNode;
    }

    #buildBalancedTree(data, rootNode) {
        const rootNodeIndex = Math.floor((data.length - 1) / 2); // Find middle of array
        const newNode = new Node(data[rootNodeIndex]);

        // Set root node reference to the new node
        if (rootNode.value > newNode.value) {
            rootNode.left = newNode;
        } else {
            rootNode.right = newNode;
        }

        if (data.length >= 3) {
            this.#buildBalancedTree(data.slice(0, rootNodeIndex), newNode); // Build left side of the tree
            this.#buildBalancedTree(data.slice(rootNodeIndex + 1), newNode); // Build right side of the tree
        } else if (data.length === 2) {
            this.#buildBalancedTree(data.slice(1), newNode);
        }
    }

    // Inserts a node with the given value to the tree
    insert(value, startNode = this.root) {
        let currNode = startNode;
        while (true) {
            if (value < currNode.value) {
                if (currNode.left === null) {
                    currNode.left = new Node(value);
                    break;
                } else {
                    currNode = currNode.left;
                }
            } else {
                if (currNode.right === null) {
                    currNode.right = new Node(value);
                    break;
                } else {
                    currNode = currNode.right;
                }
            }
        }
    }

    // Deletes a node with the given value from the tree
    delete(value) {
        let currNode = this.root;
        while (
            currNode !== null &&
            (currNode.left !== null || currNode.right !== null)
        ) {
            if (value < currNode.value) {
                if (value === currNode.left.value) {
                    this.#actionDeleteType("L", currNode);
                    break;
                }
                currNode = currNode.left;
            } else {
                if (value === currNode.right.value) {
                    this.#actionDeleteType("R", currNode);
                    break;
                }
                currNode = currNode.right;
            }
        }
    }

    // Deletes the delNode based on its children,
    // rearranging the tree as needed
    #actionDeleteType(side, prevNode) {
        let delNode;
        if (side === "L") {
            delNode = prevNode.left;
        } else {
            delNode = prevNode.right;
        }

        if (
            // If there are no children
            delNode.left === null &&
            delNode.right === null
        ) {
            if (side === "L") {
                prevNode.left = null;
            } else {
                prevNode.right = null;
            }
        } else if (
            // If there are two children
            delNode.left !== null &&
            delNode.right !== null
        ) {
            // Find successor
            const successorVal = this.#getSuccessor(delNode).value;
            this.delete(successorVal);
            delNode.value = successorVal;
        } else if (delNode.left !== null) {
            // If there is a single child on the left
            if (side === "L") {
                prevNode.left = delNode.left;
            } else {
                prevNode.right = delNode.left;
            }
        } else {
            // If there is a single child on the right
            if (side === "L") {
                prevNode.left = delNode.right;
            } else {
                prevNode.right = delNode.right;
            }
        }
    }

    // Returns the node containing a the closest bigger
    // number to currNode's value
    #getSuccessor(currNode) {
        currNode = currNode.right;
        while (currNode.left !== null) {
            currNode = currNode.left;
        }
        return currNode;
    }

    // Returns the node with the given value or
    // null if the value is not found
    find(value) {
        let currNode = this.root;
        while (currNode !== null) {
            if (currNode.value === value) {
                return currNode;
            } else if (value < currNode.value) {
                currNode = currNode.left;
            } else {
                currNode = currNode.right;
            }
        }
        return null;
    }

    // Traverses the tree in breadth-first level order and calls
    // the callback on each node as it traverses
    levelOrderForEach(callback, startNode = this.root) {
        if (!callback) {
            throw new Error("A callback function must be provided.");
        }

        let currNode;
        let queue = [startNode];
        do {
            currNode = queue.shift();
            callback(currNode);

            if (currNode.left !== null) {
                queue.push(currNode.left);
            }

            if (currNode.right !== null) {
                queue.push(currNode.right);
            }
        } while (queue.length > 0);
    }

    // Traverses the tree in inorder depth-first level order and calls
    // the callback on each node as it traverses
    inOrderForEach(callback, startNode = this.root) {
        if (!callback) {
            throw new Error("A callback function must be provided.");
        }

        let currNode = startNode;
        let queue = [currNode];
        let allowLeft = true;
        while (queue.length > 0) {
            while (allowLeft) {
                if (currNode.left !== null) {
                    queue.push(currNode.left);
                    currNode = currNode.left;
                } else {
                    allowLeft = false;
                }
            }

            currNode = queue.pop();
            callback(currNode);

            if (currNode.right !== null) {
                queue.push(currNode.right);
                currNode = currNode.right;
                allowLeft = true;
            }
        }
    }

    // Traverses the tree in preorder depth-first level order and calls
    // the callback on each node as it traverses
    preOrderForEach(callback, startNode = this.root) {
        if (!callback) {
            throw new Error("A callback function must be provided.");
        }

        let currNode = startNode;
        let queue = [currNode];
        while (queue.length > 0) {
            currNode = queue.pop();
            callback(currNode);

            if (currNode.right !== null) {
                queue.push(currNode.right);
            }

            if (currNode.left !== null) {
                queue.push(currNode.left);
            }
        }
    }

    // Traverses the tree in postorder depth-first level order and calls
    // the callback on each node as it traverses
    postOrderForEach(callback, startNode = this.root) {
        if (!callback) {
            throw new Error("A callback function must be provided.");
        }

        let currNode = startNode;
        let queue = [currNode];
        let allowLeft = true;
        let lastNode;
        while (queue.length > 0) {
            while (allowLeft && currNode.right !== lastNode) {
                if (currNode.left !== null && currNode.left !== lastNode) {
                    queue.push(currNode.left);
                    currNode = currNode.left;
                } else {
                    allowLeft = false;
                }
            }

            if (currNode.right !== null && currNode.right !== lastNode) {
                queue.push(currNode.right);
                currNode = currNode.right;
                allowLeft = true;
                continue;
            }

            if (currNode.right === null || currNode.right === lastNode) {
                callback(queue.pop());
                lastNode = currNode;
                currNode = queue.at(-1);
            }
        }
    }

    // Returns the height of the specified value or null if the value if not found.
    // Height is defined as the number of edges in the longest path from that node to a leaf node.
    // A height of 0 means the specified value is a leaf node.
    height(value) {
        const startNode = this.find(value);
        if (startNode === null) return null;
        return this.#findHeight(startNode);
    }

    // Recursively calls itself to increment height based on the children nodes of its startNode
    #findHeight(startNode) {
        let leftHeight = 0;
        if (startNode.left !== null) {
            leftHeight = this.#findHeight(startNode.left) + 1;
        }

        let rightHeight = 0;
        if (startNode.right !== null) {
            rightHeight = this.#findHeight(startNode.right) + 1;
        }

        if (leftHeight >= rightHeight) {
            return leftHeight;
        } else {
            return rightHeight;
        }
    }

    // Returns the depth of the specified value or null if the value is not found.
    // Depth is defined as the number of edges in the path from that node to the root node.
    // A depth of 0 means the specified value is the root node.
    depth(value) {
        let currNode = this.root;
        let depth = 0;
        while (currNode !== null) {
            if (currNode.value === value) {
                return depth;
            } else if (value < currNode.value) {
                currNode = currNode.left;
                depth++;
            } else {
                currNode = currNode.right;
                depth++;
            }
        }
        return null;
    }

    // Checks if the tree is balanced.
    // A binary tree is considered balanced if, for every node in the tree, the height difference
    // between its left and right subtrees is no more than 1, and both the left and right subtrees
    // are also balanced.
    isBalanced() {
        let result = true;
        this.inOrderForEach((node) => {
            let leftHeight = -1;
            if (node.left !== null) {
                leftHeight = this.#findHeight(node.left);
            }
            let rightHeight = -1;
            if (node.right !== null) {
                rightHeight = this.#findHeight(node.right);
            }

            if (Math.abs(leftHeight - rightHeight) > 1) {
                // Can be made more efficient by breaking out of while loop of parent function if callback returns false
                result = false;
            }
        });
        return result;
    }

    // Rebalances an unbalanced tree. See isBalanced() function for a definition of balanced trees
    rebalance() {
        let treeValues = [];
        this.inOrderForEach((node) => {
            treeValues.push(node.value);
        });
        this.root = this.buildTree(treeValues);
    }

    // Prints the tree in the console
    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}

export { Node, Tree };
