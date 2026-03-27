// DSA Problem 3: Remove duplicates from array

function removeDuplicates(arr) {
  // using Map instead of object to store seen values
  let seen = new Map();
  let result = [];

  for (let item of arr) {
    if (!seen.has(item)) {
      seen.set(item, true);
      result.push(item);
    }
  }

  return result;
}

// Alternative using Set (but since problem says "without built-in", using Map now)
function removeDuplicatesNoBuiltIn(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Example usage:
const arr = [1, 2, 2, 3, 4, 4, 5];
console.log(removeDuplicates(arr)); // [1, 2, 3, 4, 5]
