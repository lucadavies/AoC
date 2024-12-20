import * as fs from 'fs';

let fileName: string = "2.txt";
let encoding: BufferEncoding = "utf-8"
let input: string;
let lines: string[];
let reports: number[][] = [];
let safeCount: number = 0;

function isSafe(report: number[]): boolean {
    let safe: boolean = true;
    let isAsc: boolean = (report[0] - report[1] < 0);

    for (let i = 0; i < report.length - 1; i++) {

        // Get and check difference between neighbouring levels
        let diff: number = Math.abs(report[i] - report[i + 1]);
        if (diff > 3 || diff === 0) {
            safe = false;
            break;
        }
        if (isAsc) {
            // If list began ascending and is now descending
            if (report[i] - report[i + 1] > 0) {
                safe = false;
                break;
            }
        }
        else {
            // If list began descending and is now ascending
            if (report[i] - report[i + 1] < 0) {
                safe = false;
                break;
            }
        }
    }

    return safe;
}

function isSafeV2(report: number[]): boolean {
    let safe: boolean = true;

    let diff: number = report[0] - report[1];
    let isAsc: boolean = (diff < 0 && diff !== 0);
    let unsafeLevelPresent: boolean = false;

    for (let i = 0; i < report.length - 1; i++) {

        // Get and check difference between neighbouring levels
        let diff: number = Math.abs(report[i] - report[i + 1]);
        if (diff > 3 || diff === 0) {
            if (unsafeLevelPresent) {
                safe = false;
                break;
            }
            else {
                unsafeLevelPresent = true;
                report.splice(i + 1, 1);
                i--;
            }
        }
        if (isAsc) {
            // If list began ascending and is now descending
            if (report[i] - report[i + 1] > 0) {
                if (unsafeLevelPresent) {
                    safe = false;
                    break;
                }
                else {
                    unsafeLevelPresent = true;
                    report.splice(i + 1, 1);
                    i--;
                }
            }
        }
        else {
            // If list began descending and is now ascending
            if (report[i] - report[i + 1] < 0) {
                if (unsafeLevelPresent) {
                    safe = false;
                    break;
                }
                else {
                    unsafeLevelPresent = true;
                    report.splice(i + 1, 1);
                    i--;
                }
            }
        }
    }

    console.log(report + " : " + safe);
    return safe;
}

input = fs.readFileSync(fileName, encoding);    // Read full file in

lines = input.split('\r\n');                    // Get lines of file (reports)

for (var line of lines) {
    let reportRaw = line.split(/[ ,]+/);            // Split into levels for each report
    let currReport: number[] = [];

    // Parse strings to ints and push each to an array
    reportRaw.forEach(lvl => currReport.push(parseInt(lvl)));

    // Add complete report to array of reports
    reports.push(currReport);
}

for (var report of reports) {
    if (isSafeV2(report)) {
        safeCount++;
    }
}

console.log("Safe reports: " + safeCount);
