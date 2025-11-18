import { LinkedList } from "./linked-list.js";

// Stores string key-value pairs in a hashmap composed of buckets that are linked lists
class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
    }

    map = new Array();
    length = 0;

    // This hash function only handles keys of type string
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.capacity;
        }

        return hashCode;
    }

    // Records a key-value pair in a linked list
    set(key, value) {
        const hash = this.hash(key);
        if (!this.map[hash]) {
            this.map[hash] = new LinkedList();
        }

        // If key exists, replace the value
        let currentNode = this.map[hash].head;
        while (currentNode) {
            if (Object.keys(currentNode.value)[0] === key) {
                return (currentNode.value[key] = value);
            }
            currentNode = currentNode.nextNode;
        }

        // Append the value if key does not exist
        this.map[hash].append({ [key]: value });
        this.length++;

        // Grow capacity dynamically when the load factor is reached and recompute all hashes
        if (this.length >= this.capacity * this.loadFactor) {
            this.capacity *= 2;
            const data = this.entries();
            this.clear();
            this.length = 0;

            data.forEach((elem) => this.set(elem[0], elem[1]));
        }
    }

    // Retrieves the value of a key from the hash map
    get(key) {
        const hash = this.hash(key);
        if (!this.map[hash]) {
            return null;
        }
        let currentNode = this.map[hash].head;
        if (Object.keys(currentNode.value)[0] === key) {
            return currentNode.value[key];
        }

        while (currentNode.nextNode) {
            currentNode = currentNode.nextNode;
            if (Object.keys(currentNode.value)[0] === key) {
                return currentNode.value[key];
            }
        }

        return null;
    }

    // Returns true if the key exists in the hash map and false otherwise
    has(key) {
        const hash = this.hash(key);
        if (!this.map[hash] || !this.map[hash].head) {
            return false;
        }
        let currentNode = this.map[hash].head;
        if (Object.keys(currentNode.value)[0] === key) {
            return true;
        }

        while (currentNode.nextNode) {
            currentNode = currentNode.nextNode;
            if (Object.keys(currentNode.value)[0] === key) {
                return true;
            }
        }

        return false;
    }

    // Removes the specified key from the hash map
    remove(key) {
        const hash = this.hash(key);
        const bucket = this.map[hash];
        if (!this.map[hash]) {
            return false;
        }
        let currentNode = bucket.head;
        if (Object.keys(currentNode.value)[0] === key) {
            bucket.removeAt(0);
            this.length--;
            return true;
        }

        let i = 1;
        while (currentNode.nextNode) {
            currentNode = currentNode.nextNode;
            if (Object.keys(currentNode.value)[0] === key) {
                bucket.removeAt(i);
                this.length--;
                return true;
            }
            i++;
        }

        return false;
    }

    // Returns the total number of keys stored in all buckets of the hashmap
    getLength() {
        return this.length;
    }

    // Removes all keys from all buckets of the hash map
    clear() {
        this.map = new Array();
        // this.map.forEach((elem) => {
        //     // elem.head.nextNode = null;
        //     // elem.tail.nextNode = null;
        //     // elem.head.value = null;
        //     // elem.tail.value = null;
        //     // elem.size = 0;
        //     this.elem = null;
        // });
    }

    // Returns an array containing all the keys inside the hash map
    keys() {
        let keys = [];
        this.map.forEach((elem) => {
            let currentNode = elem.head;
            if (currentNode.value) {
                keys.push(Object.keys(currentNode.value)[0]);
            }

            while (currentNode.nextNode) {
                currentNode = currentNode.nextNode;
                if (currentNode.value) {
                    keys.push(Object.keys(currentNode.value)[0]);
                }
            }
        });
        return keys;
    }

    // Returns an array containing all the values inside the hash map
    values() {
        let values = [];
        this.map.forEach((elem) => {
            let currentNode = elem.head;
            if (currentNode.value) {
                values.push(Object.values(currentNode.value)[0]);
            }

            while (currentNode.nextNode) {
                currentNode = currentNode.nextNode;
                if (currentNode.value) {
                    values.push(Object.values(currentNode.value)[0]);
                }
            }
        });
        return values;
    }

    // Returns an array containing each key-value pair as an array inside an array
    entries() {
        let keyValues = [];
        this.map.forEach((elem) => {
            let currentNode = elem.head;
            if (currentNode.value) {
                keyValues.push([
                    Object.keys(currentNode.value)[0],
                    Object.values(currentNode.value)[0],
                ]);
            }

            while (currentNode.nextNode) {
                currentNode = currentNode.nextNode;
                if (currentNode.value) {
                    keyValues.push([
                        Object.keys(currentNode.value)[0],
                        Object.values(currentNode.value)[0],
                    ]);
                }
            }
        });
        return keyValues;
    }
}

export { HashMap };
