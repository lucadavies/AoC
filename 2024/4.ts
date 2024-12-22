import { getFileLines } from "./ReadFileLines";

let fileName: string = "4.txt";
let lines: string[] = getFileLines(fileName);
let target: string = "XMAS";
let count: number = 0;

enum Direction {
    Up,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight
}

export function main(): void {
    mainT1();
    mainT2();
}

function mainT1(): void {
    count = 0;
    // Iterate over every letter in the grid
    for (let j = 0; j < lines[0].length; j++) {
        for (let i = 0; i < lines.length; i++) {
            // Target letter to begin with
            let k = 0;
            if (lines[j][i] === target[k]) {
                // Check each direction recursively along the target word
                findNextChar(j, i, k + 1, Direction.Up);
                findNextChar(j, i, k + 1, Direction.Down);
                findNextChar(j, i, k + 1, Direction.Left);
                findNextChar(j, i, k + 1, Direction.Right);
                findNextChar(j, i, k + 1, Direction.UpLeft);
                findNextChar(j, i, k + 1, Direction.UpRight);
                findNextChar(j, i, k + 1, Direction.DownLeft);
                findNextChar(j, i, k + 1, Direction.DownRight);
            }
        }
    }
    console.log("XMAS Count: " + count);
}

function mainT2(): void {
    count = 0;
    // Iterate over every letter in the grid, ignoring the edges as centre of pattern cannot be at the edge.
    for (let j = 1; j < lines[0].length - 1; j++) {
        for (let i = 1; i < lines.length - 1; i++) {
            if (lines[j][i] === "A")
            {
                findCrossMAS(j, i);
            }
        }
    }
    console.log("X-MAS Count: " + count);
}

/**
 * Recursive function to check presence of target word in input. Adds 1 to count if end of target word is reached.
 * @param y y coord of letter we're checking
 * @param x x coord of letter we're checking
 * @param z index of letter in target word
 * @param dir direction we're checking
 */
function findNextChar(y: number, x: number, z: number, dir: Direction): void {
    if (z < target.length) {
        switch (dir) {
            case Direction.Up: {
                    if (y - 1 >= 0) {
                        if (lines[y - 1][x] === target[z]) {
                            findNextChar(y - 1, x, z + 1, dir);
                        }
                    }
                }
                break;
            case Direction.Down: {
                if (y + 1 < lines.length) {
                    if (lines[y + 1][x] === target[z]) {
                        findNextChar(y + 1, x, z + 1, dir);
                    }
                }
                break;
            }
            case Direction.Left: {
                if (x - 1 >= 0) {
                    if (lines[y][x - 1] === target[z]) {
                        findNextChar(y, x - 1, z + 1, dir);
                    }
                }
                break;
            }
            case Direction.Right: {
                if (x + 1 < lines[y].length) {
                    if (lines[y][x + 1] === target[z]) {
                        findNextChar(y, x + 1, z + 1, dir);
                    }
                }
                break;
            } 
            case Direction.UpLeft: {
                if (y - 1 >= 0 && x - 1 >= 0) {
                    if (lines[y - 1][x - 1] === target[z]) {
                        findNextChar(y - 1, x - 1, z + 1, dir);
                    }
                }
                break;
            }
            case Direction.UpRight: {
                if (y - 1 >= 0 && x + 1 < lines[y].length) {
                    if (lines[y - 1][x + 1] === target[z]) {
                        findNextChar(y - 1, x + 1, z + 1, dir);
                    }
                }
                break;
            }
            case Direction.DownLeft: {
                if (y + 1 < lines.length && x - 1 >= 0) {
                    if (lines[y + 1][x - 1] === target[z]) {
                        findNextChar(y + 1, x - 1, z + 1, dir);
                    }
                }
                break;
            }
            case Direction.DownRight: {
                if (y + 1 < lines.length && x + 1 < lines[y + 1].length) {
                    if (lines[y + 1][x + 1] === target[z]) {
                        findNextChar(y + 1, x + 1, z + 1, dir);
                    }
                }
                break;
            }
        }
    }
    else {
        count++;
    }
}

/**
 * A not-very-generic function to check for presence of our cross-pattern.
 * @param y y coord of centre letter in our cross pattern (A)
 * @param x x coord of centre letter in our cross pattern (A)
 */
function findCrossMAS(y: number, x: number): void {
    /** Check for MS pattern (shown visually in IFs)
     *            MS
     */
    if (lines[y - 1][x - 1] === "M" && lines[y - 1][x + 1] === "S" ) {
        if (lines[y + 1][x - 1] === "M" && lines[y + 1][x + 1] === "S") {
            count++;
        }
    }
    /** Check for MS pattern (shown visually in IFs)
     *            SS
     */
    else if (lines[y - 1][x - 1] === "M" && lines[y - 1][x + 1] === "M" ) {
        if (lines[y + 1][x - 1] === "S" && lines[y + 1][x + 1] === "S") {
            count++;
        }
    }
    /** Check for SM pattern (shown visually in IFs)
     *            SM
     */
    else if (lines[y - 1][x - 1] === "S" && lines[y - 1][x + 1] === "M" ) {
        if (lines[y + 1][x - 1] === "S" && lines[y + 1][x + 1] === "M") {
            count++;
        }
    }
    /** Check for SS pattern (shown visually in IFs)
     *            MM
     */
    else if (lines[y - 1][x - 1] === "S" && lines[y - 1][x + 1] === "S" ) {
        if (lines[y + 1][x - 1] === "M" && lines[y + 1][x + 1] === "M") {
            count++;
        }
    }
}