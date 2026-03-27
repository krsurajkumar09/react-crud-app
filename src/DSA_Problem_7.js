// DSA Problem 7: Merge two sorted arrays

function mergeSortedArrays(arr1, arr2) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  // Add remaining elements
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

// Example usage:
const arr1 = [0, 3, 4, 31];
const arr2 = [4, 6, 30];
console.log(mergeSortedArrays(arr1, arr2)); // [0, 3, 4, 4, 6, 30, 31]
