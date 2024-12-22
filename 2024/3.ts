import { getFileLines } from "./ReadFileLines";

let fileName: string = "3.txt";
let lines: string[] = getFileLines(fileName);
let reInstrs: RegExp = /(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\))/g;
let reNums: RegExp = /[0-9]{1,3}/g;
const doInst: string = "do()";
const dontInst: string = "don't()";
let total: number = 0;
let enabled: boolean = true;


export function main(): void {
    // Do all of the following for each line of input
    for (let line of lines) {

        // Match on all valid kinda of instruction
        let matches = line.matchAll(reInstrs);
        let instrs: string[] = [];

        // Get a list of all instructions
        for (let match of matches) {
            instrs.push(match[0]);
        }

        // Parse each instruction
        for (let instr of instrs) {
            if (instr === doInst) {
                // Set enabled to true if "do()"
                enabled = true;
            }
            else if (instr === dontInst) {
                // Set enabled to false if "don't()"
                enabled = false;
            }
            else if (enabled) {
                // Else, carry out a multiplication if enabled.

                // Get numbers from instruction
                matches = instr.matchAll(reNums);

                let nums: number[] = []
                for (let match of matches) {
                    nums.push(parseInt(match[0]));
                }

                // Multiply numbers
                total += nums[0] * nums[1];
            }
        }
    }


    console.log("Total: " + total);
}