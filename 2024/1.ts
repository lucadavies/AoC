import * as fs from 'fs';

let fileName: string = "1.txt";
let encoding: BufferEncoding = "utf-8"
let input: string;
let list1: number[] = [];
let list2: number[] = [];
let lines: string[];
let total: number = 0;

input = fs.readFileSync(fileName, encoding);    // Read full file in

lines = input.split('\r\n');                    // Get lines of file

for (var line of lines) {
    let items = line.split(/[ ,]+/);            // Split into the two values on each line...
    list1.push(parseInt(items[0]));             // And push into two lists
    list2.push(parseInt(items[1]));
}

// Sort both lists numerically
list1 = list1.sort((a, b) => a - b);
list2 = list2.sort((a, b) => a - b);

// Iterate through full list of pairs, adding difference between the two to a running total.
for (let i = 0; i<lines.length; i++) {
    total += Math.abs(list1[i] - list2[i]);
}


console.log(total);                             // Print answer
