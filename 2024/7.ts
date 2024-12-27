import { getFileLines } from "./ReadFileLines";

let fileName: string = "7.txt";
let lines: string[] = getFileLines(fileName);
let operands: number[][] = [];
let values: number[] = [];
let total: number = 0;
let operators: string[] = ["+", "*"];
let combos: string[] = [];

export function main(): void {
    parseNumbers();

    CombinationRepetition(operators);

    for (let i = 0; i < values.length; i++) {
        if (testEquation(i)) {
            //total += values[i];
        }
    }

    console.log(total);
}

function parseNumbers(): void {
    let split: string[];
    let thisOperands: number[];
    for (let line of lines) {
        thisOperands = [];
        split = line.split(":");
        values.push(parseInt(split[0]));
        split = split[1].slice(1, split[1].length).split(" ");
        for (let num of split) {
            thisOperands.push(parseInt(num));
        }
        operands.push(thisOperands);
    }
}

function testEquation(eqIndex: number): boolean {
    console.log(eqIndex);
    for (let i = 0; i < operands[eqIndex].length - 1; i++) {
        total = 0;
        total = doNextMathOperation(total, eqIndex, i);
        console.log(total);
    }
    return false;
}

function doNextMathOperation(total: number, eqIndex: number, opIndex: number): number {
    let a: string = operands[eqIndex][opIndex].toString();
    let b: string = operands[eqIndex][opIndex + 1].toString();
    let eq: string = "";

    for (let op of operators) {
        eq = a + op + b;
        total += eval(eq);
        opIndex++;
    }
    return total;
}


// javascript program to print all combination of size r in an array 
// of size n with repetitions allowed 
/* arr ---> Input Array 
chosen ---> Temporary array to store indices of 
             current combination 
start & end ---> Starting and Ending indexes in arr 
r ---> Size of a combination to be printed */
function generateCombos(chosen, arr,
    index, r, start, end) {

    // Since index has become r, current combination is 
    // ready to be printed, print 
    if (index == r) {
        for (let i = 0; i < r; i++) {
            combos.push(arr[chosen[i]]);
        }
        console.log(combos);
        return;
    }

    // One by one choose all elements (without considering 
    // the fact whether element is already chosen or not) 
    // and recur 
    for (let i = start; i <= end; i++) {
        chosen[index] = i;
        generateCombos(chosen, arr, index + 1,
            r, i, end);
    }
    return;
}

// The main function that prints all combinations of size r 
// in arr of size n with repetitions. This function mainly 
// uses CombinationRepetitionUtil() 
function CombinationRepetition(arr) {

    // Allocate memory 
    var chosen = Array.from({ length: (arr.length + 1) }, (_, i) => 0);

    // Call the recursive function 
    generateCombos(chosen, arr, 0, arr.length, 0, arr.length - 1);
}