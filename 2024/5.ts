import { getFileLines } from "./ReadFileLines";

let fileName: string = "5.txt";
let lines: string[] = getFileLines(fileName);
let total: number = 0;
let incorrectIndex: number[] = [];

export function main(): void {
    let rules: number[][] = [];
    let updates: number[][] = [];

    getInputSections(rules, updates);

    for (let update of updates) {
        //console.log("Update index: " + updates.indexOf(update));
        if (isCorrect(update, rules)) {
            //console.log("Correct");
            total += update[(update.length - 1) / 2];
        }
    }
    console.log("Total: " + total);
}

/**
 * Parses the input to acquire the two separate input sections, separated a blank line. Parses both rules and updates section to numbers.
 * @param a Array to push rules input section to
 * @param b Array to push updates input section to
 */
function getInputSections(a: number[][], b: number[][]): void {
    let isRules = true;
    for (let line of lines) {
        // Detect blank line and set bool
        if (line.length === 0) {
            isRules = false;
            continue;
        }
        if (isRules) {
            // If blank line not yet seen, parse as rule
            a.push(line.split("|").map(n => parseInt(n)));
        }
        else {
            // Else parse as update sequence
            b.push(line.split(",").map(n => parseInt(n)));
        }
    }
}

function isCorrect(seq: number[], rules: number[][]): boolean {
    let foundIndex = 0;
    // Iterate over each page in update
    for (let i = 1; i < seq.length; i++) {
        for (let rule of rules) {
            // If rule exists for that page
            if (rule[0] === seq[i]) {
                // Get index of second page of rule (this must be after first)
                foundIndex = seq.findIndex(x => x === rule[1])
                // If second page is first, return false
                if (foundIndex >=0 && foundIndex < i) {
                    // console.log("Failed on " + seq[i] + " with rule " + rule[0] + "|" + rule[1]);
                    
                    return false;
                }
            }
        }
    }
    return true;
}