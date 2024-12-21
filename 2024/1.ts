import { getFileLines } from "./ReadFileLines";

let fileName: string = "1.txt";
let lines: string[] = getFileLines(fileName)
let list1: number[] = [];
let list2: number[] = [];
let total: number = 0;
let similarity: number = 0;

for (var line of lines) {
    let items = line.split(/[ ,]+/);            // Split into the two values on each line...
    list1.push(parseInt(items[0]));             // And push into two lists
    list2.push(parseInt(items[1]));
}

// Sort both lists numerically
list1 = list1.sort((a, b) => a - b);
list2 = list2.sort((a, b) => a - b);

// Iterate through full list of pairs
for (let i = 0; i < lines.length; i++) {
    total += Math.abs(list1[i] - list2[i]);     // Add difference between the two numbers to a running total (task one)

    let count: number = 0;
    for (let j = 0; j < lines.length; j++) {      // Iterate over each number in list2 to find occurences of the current number in list1...
        if (list2[j] === list1[i]) {
            count++;
        }
    }
    similarity += count * list1[i];             // Then multiple by the list1 number to add to similarity score (task 2)
}

console.log("Distance: " + total);                             // Print answer
console.log("Similarity: " + similarity);
