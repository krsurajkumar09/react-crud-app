// DSA Problem 6: Find factorial of given number

function factorial(n) {
  if (n < 0) return undefined; // Factorial not defined for negative numbers
  if (n === 0 || n === 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Recursive version
function factorialRecursive(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Example usage:
console.log(factorial(5)); // 120
console.log(factorialRecursive(5)); // 120
