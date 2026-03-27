// DSA Problem 8: Check if every value in arr1 has its squared value in arr2 with same frequency

function sameFrequencySquared(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let freq1 = {};
  let freq2 = {};

  // Count frequencies for arr1
  for (let num of arr1) {
    freq1[num] = (freq1[num] || 0) + 1;
  }

  // Count frequencies for arr2
  for (let num of arr2) {
    freq2[num] = (freq2[num] || 0) + 1;
  }

  // Check if squared values exist with same frequency
  for (let num in freq1) {
    let squared = num * num;
    if (!freq2[squared] || freq2[squared] !== freq1[num]) {
      return false;
    }
  }

  return true;
}

// Example usage:
console.log(sameFrequencySquared([1, 2, 3], [1, 4, 9])); // true
console.log(sameFrequencySquared([1, 2, 3], [1, 9])); // false
console.log(sameFrequencySquared([1, 2, 1], [1, 4, 4])); // false
