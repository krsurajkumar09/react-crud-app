// DSA Problem 1: Find longest word in a given sentence

function findLongestWord(sentence) {
  let words = sentence.split(" ");
  let longest = "";

  for (let word of words) {
    // Remove everything except alphanumeric characters
    let cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
    if (cleanWord.length > longest.length) {
      longest = cleanWord;
    }
  }

  return longest;
}

// Example usage:
const sentence = "The quick brown fox jumps over the lazy dog";
console.log("Example result:", findLongestWord(sentence)); // "jumps" or "brown" (same length)

// Extra explicit demonstration with punctuation and alphanumeric filtering
const testSentence = "Hello, world!!! 1234 and ??? one_more";
console.log("Test result:", findLongestWord(testSentence)); // expected "one_more" cleaned to "onemore"
