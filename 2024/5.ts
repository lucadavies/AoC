import { getFileLines } from "./ReadFileLines";

let fileName: string = "5.txt";
let lines: string[] = getFileLines(fileName);

export function main(): void {
    let rules: number[][] = [];
    let updates: number[][] = [];
    let correctedUpdates: number[][] = [];
    let correctIndexes: number[] = [];
    let incorrectIndexes: number[] = [];

    getInputSections(rules, updates);

    for (let i = 0; i < updates.length; i++) {
        if (isCorrect(updates[i], rules)) {
            correctIndexes.push(i);
        }
        else {
            incorrectIndexes.push(i);
        }
    }

    correctUpdates(updates, incorrectIndexes, rules);

    console.log("Total for correct: " + getSumMiddlePages(updates, correctIndexes));
    console.log("Total for incorrect: " + getSumMiddlePages(updates, incorrectIndexes));
}

/**
 * Parses the input to acquire the two separate input sections, separated a blank line. Parses both rules and updates section to numbers..
 * @param a Array to push rules input section to.
 * @param b Array to push updates input section to.
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

/**
 * Returns true is seq passes the given rules.
 * @param seq Sequence of numbers to check against rules.
 * @param rules The set of rules to check seq against.
 * @returns True is seq obeys the rules, else returns false.
 */
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
                if (foundIndex >= 0 && foundIndex < i) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Performs the same function as isCorrect, but reorders elements to satisfy rules as it goes.
 * @param seq Sequence of numbers to check against rules.
 * @param rules The set of rules to check seq against.
 */
function correctUpdates(updates: number[][], indexes: number[], rules: number[][]): void {
    for (let i of indexes) {
        let foundIndex = 0;
        let page;
        // Iterate over each page in update
        for (let j = 1; j < updates[i].length; j++) {
            page = updates[i][j]
            for (let rule of rules) {
                // If rule exists for that page
                if (rule[0] === page) {
                    // Get index of second page of rule (this must be after first)
                    foundIndex = updates[i].findIndex(x => x === rule[1])
                    // If second page is first, return false
                    if (foundIndex >= 0 && foundIndex < j) {
                        // Swap pages that are out of order
                        updates[i].splice(foundIndex, 0, updates[i].splice(j, 1)[0]);
                        j--;
                    }
                }
            }
        }

        // Check again if updates are correct, and if not, run another pass of correction again.
        if (!isCorrect(updates[i], rules)) {
            correctUpdates(updates, indexes, rules);
        } 
    }
}

/**
 * Sums the middle value in each update defined by the indexes passed in.
 * @param updates The array updates from which to find and sum middle values.
 * @param indexesToSum The indexes of the updates to sum.
 */
function getSumMiddlePages(updates: number[][], indexesToSum: number[]): number {
    let total: number = 0;
    for (let i of indexesToSum) {
        total += updates[i][(updates[i].length - 1) / 2];
    }
    return total;
}