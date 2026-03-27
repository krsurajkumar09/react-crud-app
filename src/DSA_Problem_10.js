// DSA Problem 10: Get unique objects from array based on name property

function getUniqueObjects(arr) {
  let seen = {};
  let result = [];

  for (let obj of arr) {
    if (!seen[obj.name]) {
      seen[obj.name] = true;
      result.push(obj);
    }
  }

  return result;
}

// Example usage:
const input = [
  { name: "sai" },
  { name: "Nang" },
  { name: "sai" },
  { name: "Nang" },
  { name: "111111" },
];

console.log(getUniqueObjects(input));
// Output: [{name: "sai"}, {name: "Nang"}, {name: "111111"}]
