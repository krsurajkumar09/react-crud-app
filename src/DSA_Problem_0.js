// DSA Problem 0: Flatten nested array without using built-in function

function flattenArray(arr) {
  let result = [];
  let stack = [];

  // Initialize stack with array elements in reverse order to maintain original order
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push(arr[i]);
  }

  while (stack.length > 0) {
    let current = stack.pop();
    if (Array.isArray(current)) {
      // Push array elements in reverse order 
      for (let i = current.length - 1; i >= 0; i--) {
        stack.push(current[i]);
      }
    } else {
      result.push(current);
    }
  }

  return result;
}

// // Recursive version using concat
// function flattenArrayWithConcat(arr) {
//   let result = [];
//   for (let item of arr) {
//     if (Array.isArray(item)) {
//       result = result.concat(flattenArrayWithConcat(item));
//     } else {
//       result.push(item);
//     }
//   }
//   return result;
// }

// // Iterative version using concat (level by level)
// function flattenArrayWithConcatIterative(arr) {
//   let result = arr.slice(); // copy the array
//   let changed = true;

//   while (changed) {
//     changed = false;
//     let newResult = [];
//     for (let item of result) {
//       if (Array.isArray(item)) {
//         newResult = newResult.concat(item);
//         changed = true;
//       } else {
//         newResult.push(item);
//       }
//     }
//     result = newResult;
//   }

//   return result;
// }

// Example usage:
const nested = [1, [2, [3, 4], 5], 6, [7, 8]];
console.log(flattenArray(nested)); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(flattenArrayWithConcat(nested)); // [1, 2, 3, 4, 5, 6, 7, 8]
