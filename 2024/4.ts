import { getFileLines } from "./ReadFileLines";

let fileName: string = "4.txt";
let lines: string[] = getFileLines(fileName);
let target: string = "XMAS";
let count: number = 0;

enum Direction {
    Up = 0,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight
}

export function main(): void {
    for (let j = 0; j < lines[0].length; j++) {
        for (let i = 0; i < lines.length; i++) {
            let k = 0;
            if (lines[j][i] === target[k]) {
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
    console.log("Count: " + count);
}

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