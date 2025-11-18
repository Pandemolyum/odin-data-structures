class Node {
    constructor() {
        this.value = null;
        this.nextNode = null;
    }
}

class LinkedList {
    size = 0;
    head = null;
    tail = null;

    // Appends a value to the end of the list
    append(value) {
        const newNode = new Node();
        newNode.value = value;

        this.size++;

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }

    // Prepends a value to the linked list. At least one value must have been appended before using prepend.
    prepend(value) {
        const newNode = new Node();
        newNode.value = value;
        newNode.nextNode = this.head;
        this.head = newNode;
        this.size++;
    }

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    // Return element at nth position, starting from 0. -1 represents the last element.
    at(index) {
        if (index < 0) {
            index = this.size + index;
        }

        let counter = 0;
        let currentNode = this.head;
        while (counter != index) {
            currentNode = currentNode.nextNode;
            counter++;
        }

        return currentNode;
    }

    // Remove last node from the list
    pop() {
        const newLastNode = this.at(-2);
        newLastNode.nextNode = null;
        this.tail = newLastNode;
        this.size--;
    }

    // Returns true or false if value is contained within the list
    contains(value) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    // Returns the index of the node containing value
    find(value) {
        let i = 0;
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return i;
            }
            currentNode = currentNode.nextNode;
            i++;
        }
        return null;
    }

    // Prints the values in the linked list as strings in the console
    toString() {
        let str = "";
        let currentNode = this.head;
        while (currentNode) {
            str += "( " + currentNode.value + " ) -> ";
            currentNode = currentNode.nextNode;
        }
        str += "null";
        console.log(str);
    }

    // Inserts a new node at the given index
    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
        } else if (index === this.size - 1) {
            this.append(value);
        } else {
            const newNode = new Node();
            newNode.value = value;

            const prevNode = this.at(index - 1);
            newNode.nextNode = prevNode.nextNode;
            prevNode.nextNode = newNode;

            this.size++;
        }
    }

    // Removes a node at the given index
    removeAt(index) {
        if (index === 0) {
            this.head = this.head.nextNode;
        } else if (index === this.size - 1) {
            const prevNode = this.at(index - 1);
            prevNode.nextNode = null;
            this.tail = prevNode;
        } else {
            const prevNode = this.at(index - 1);
            const nextNode = prevNode.nextNode.nextNode;
            prevNode.nextNode = nextNode;
        }
        this.size--;
    }
}

export { Node, LinkedList };
