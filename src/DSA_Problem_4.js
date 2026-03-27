// DSA Problem 4: Reverse string without built-in method

function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// Example usage:
const str = "hello world";
console.log(reverseString(str)); // "dlrow olleh"
