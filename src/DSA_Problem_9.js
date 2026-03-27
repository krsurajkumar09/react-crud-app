// DSA Problem 9: Check if one string can be formed by rearranging letters of another

function isAnagram(str1, str2) {
  // Remove spaces and convert to lowercase
  str1 = str1.replace(/\s/g, "").toLowerCase();
  str2 = str2.replace(/\s/g, "").toLowerCase();

  if (str1.length !== str2.length) return false;

  let freq = {};

  // Count frequency of characters in str1
  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Decrement frequency for characters in str2
  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

// Example usage:
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false
