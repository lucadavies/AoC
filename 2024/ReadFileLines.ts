import * as fs from 'fs';

let encoding: BufferEncoding = "utf-8"
let input: string;

export function getFileLines(fileName: string): string[] {
    input = fs.readFileSync(fileName, encoding);    // Read full file in

    return input.split('\r\n');                    // Get lines of file
}