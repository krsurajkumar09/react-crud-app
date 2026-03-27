// DSA JavaScript Functions Reference
// This file contains important and most used functions for Object, Array, Map, and Set
// Useful for Data Structures and Algorithms problem solving

// ==================== ARRAY FUNCTIONS ====================

// 1. push() - Add element to end of array (O(1) amortized)
let arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4]

// 2. pop() - Remove and return last element (O(1))
let last = arr.pop(); // 4, arr = [1, 2, 3]

// 3. shift() - Remove and return first element (O(n))
let first = arr.shift(); // 1, arr = [2, 3]

// 4. unshift() - Add element to beginning (O(n))
arr.unshift(0); // [0, 2, 3]

// 5. splice(start, deleteCount, ...items) - Remove/replace elements (O(n))
arr.splice(1, 1, 5); // Remove 1 element at index 1, add 5: [0, 5, 3]

// 6. slice(start, end) - Return shallow copy of portion (O(n))
let subArr = arr.slice(1, 3); // [5, 3]

// 7. forEach(callback) - Execute function for each element (O(n))
arr.forEach((item, index) => console.log(item, index));

// 8. map(callback) - Create new array with results of callback (O(n))
let doubled = arr.map(x => x * 2); // [0, 10, 6]

// 9. filter(callback) - Create new array with elements that pass test (O(n))
let evens = arr.filter(x => x % 2 === 0); // [0]

// 10. reduce(callback, initialValue) - Reduce array to single value (O(n))
let sum = arr.reduce((acc, curr) => acc + curr, 0); // 8

// 11. find(callback) - Return first element that passes test (O(n))
let found = arr.find(x => x > 2); // 5

// 12. findIndex(callback) - Return index of first element that passes test (O(n))
let index = arr.findIndex(x => x > 2); // 1

// 13. sort(compareFunction) - Sort array in place (O(n log n))
arr.sort((a, b) => a - b); // [0, 3, 5]

// 14. reverse() - Reverse array in place (O(n))
arr.reverse(); // [5, 3, 0]

// 15. includes(value) - Check if array contains value (O(n))
let hasFive = arr.includes(5); // true

// 16. indexOf(value) - Return first index of value (O(n))
let idx = arr.indexOf(3); // 1

// 17. join(separator) - Join all elements into string (O(n))
let str = arr.join('-'); // "5-3-0"

// 18. concat(...arrays) - Merge arrays (O(n))
let merged = arr.concat([1, 2]); // [5, 3, 0, 1, 2]

// ==================== OBJECT FUNCTIONS ====================

// 1. Object.keys(obj) - Return array of object's own enumerable property names (O(n))
let obj = {a: 1, b: 2, c: 3};
let keys = Object.keys(obj); // ['a', 'b', 'c']

// 2. Object.values(obj) - Return array of object's own enumerable property values (O(n))
let values = Object.values(obj); // [1, 2, 3]

// 3. Object.entries(obj) - Return array of [key, value] pairs (O(n))
let entries = Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// 4. Object.assign(target, ...sources) - Copy properties from sources to target (O(n))
let target = {};
Object.assign(target, obj); // {a: 1, b: 2, c: 3}

// 5. Object.freeze(obj) - Freeze object, prevent modifications
Object.freeze(obj); // obj cannot be modified

// 6. Object.hasOwnProperty(prop) - Check if object has property as own property
let hasProp = obj.hasOwnProperty('a'); // true

// 7. Object.create(proto) - Create object with specified prototype
let proto = {greet: () => 'Hello'};
let child = Object.create(proto);
child.name = 'World'; // child.greet() returns 'Hello'

// ==================== MAP FUNCTIONS ====================

// Map maintains insertion order and allows any type as key
let map = new Map();

// 1. set(key, value) - Add or update key-value pair (O(1) average)
map.set('a', 1);
map.set(2, 'two');
map.set(true, false);

// 2. get(key) - Return value associated with key (O(1) average)
let value = map.get('a'); // 1

// 3. has(key) - Check if key exists (O(1) average)
let exists = map.has(2); // true

// 4. delete(key) - Remove key-value pair (O(1) average)
map.delete(true);

// 5. size - Get number of elements (O(1))
let size = map.size; // 2

// 6. keys() - Return iterator of keys
let mapKeys = map.keys(); // MapIterator {'a', 2}

// 7. values() - Return iterator of values
let mapValues = map.values(); // MapIterator {1, 'two'}

// 8. entries() - Return iterator of [key, value] pairs
let mapEntries = map.entries(); // MapIterator {['a', 1], [2, 'two']}

// 9. forEach(callback) - Execute function for each pair (O(n))
map.forEach((value, key) => console.log(key, value));

// 10. clear() - Remove all elements (O(n))
map.clear();

// ==================== SET FUNCTIONS ====================

// Set stores unique values of any type
let set = new Set();

// 1. add(value) - Add value to set (O(1) average)
set.add(1);
set.add(2);
set.add(2); // Duplicate, ignored
set.add('hello');

// 2. has(value) - Check if value exists (O(1) average)
let hasValue = set.has(1); // true

// 3. delete(value) - Remove value from set (O(1) average)
set.delete('hello');

// 4. size - Get number of elements (O(1))
let setSize = set.size; // 2

// 5. keys() - Return iterator of values (same as values())
let setKeys = set.keys(); // SetIterator {1, 2}

// 6. values() - Return iterator of values
let setValues = set.values(); // SetIterator {1, 2}

// 7. entries() - Return iterator of [value, value] pairs
let setEntries = set.entries(); // SetIterator {[1, 1], [2, 2]}

// 8. forEach(callback) - Execute function for each value (O(n))
set.forEach(value => console.log(value));

// 9. clear() - Remove all elements (O(n))
set.clear();

// ==================== COMMON DSA PATTERNS ====================

// Two Sum using Map for O(n) lookup
function twoSum(nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Frequency count using Map
function frequencyCount(arr) {
    let freq = new Map();
    for (let num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    return freq;
}

// Remove duplicates using Set
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Check for duplicates using Set
function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
}

// Group by using Map
function groupBy(arr, keyFn) {
    let groups = new Map();
    for (let item of arr) {
        let key = keyFn(item);
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(item);
    }
    return groups;
}

console.log('DSA JS Functions Reference loaded');