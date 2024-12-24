import { getFileLines } from "./ReadFileLines";

let fileName: string = "6.txt";
let lines: string[] = getFileLines(fileName);
const xMax: number = lines[0].length;
const yMax: number = lines.length;
let guardLoc: number[] = [];
let guardDir: string;
let map: string[][] = [];
const dirs: string[] = ["^", ">", "v", "<"];
let offMap: boolean = false;

export function main(): void {
    map = convertToMap(lines);
    [guardLoc, guardDir] = getGuardInfo();
    do {
        moveGuard();
        //printMap();
    } while (!offMap);
    console.log("Conut: " + countPath());
}

function convertToMap(lines: string[]): string[][] {
    let tmp: string[][] = [];
    for (let line of lines) {
        tmp.push(line.split(""));
    }
    return tmp;
}

function getGuardInfo(): [number[], string] {
    let chr = "";
    for (let j = 0; j < yMax; j++) {
        for (let i = 0; i < xMax; i++) {
            chr = map[j][i];
            if (chr === "^" || chr === ">" || chr === "v" || chr === "<") {
                return [[i, j], chr];
            }
        }
    }
    return [[-1, -1], "-"];
}

/**
 * Moves the guard to their next location, marking previous locations, and turning as needed.
 */
function moveGuard(): void {
    if (guardDir === "^") {
        if (isInBounds(guardLoc[1] - 1, guardLoc[0])) {
            if (map[guardLoc[1] - 1][guardLoc[0]] === "#") {
                guardDir = getNextDirection()
            }
            else {
                map[guardLoc[1]][guardLoc[0]] = "X";
                guardLoc[1] -= 1;
            }
        }
        else {
            map[guardLoc[1]][guardLoc[0]] = "X";
            offMap = true;
        }
    }
    else if (guardDir === ">") {
        if (isInBounds(guardLoc[1], guardLoc[0] + 1)) {
            if (map[guardLoc[1]][guardLoc[0] + 1] === "#") {
                guardDir = getNextDirection()
            }
            else {
                map[guardLoc[1]][guardLoc[0]] = "X";
                guardLoc[0] += 1;
            }
        }
        else {
            map[guardLoc[1]][guardLoc[0]] = "X";
            offMap = true;
        }
    }
    else if (guardDir === "v") {
        if (isInBounds(guardLoc[1] + 1, guardLoc[0])) {
            if (map[guardLoc[1] + 1][guardLoc[0]] === "#") {
                guardDir = getNextDirection()
            }
            else {
                map[guardLoc[1]][guardLoc[0]] = "X";
                guardLoc[1] += 1;
            }
        }
        else {
            map[guardLoc[1]][guardLoc[0]] = "X";
            offMap = true;
        }
    }
    else if (guardDir === "<") {
        if (isInBounds(guardLoc[1], guardLoc[0] - 1)) {
            if (map[guardLoc[1]][guardLoc[0] - 1] === "#") {
                guardDir = getNextDirection()
            }
            else {
                map[guardLoc[1]][guardLoc[0]] = "X";
                guardLoc[0] -= 1;
            }
        }
        else {
            map[guardLoc[1]][guardLoc[0]] = "X";
            offMap = true;
        }
    }
}

/**
 * Gets the next direction the guard will turn to when hitting an obstacle.
 * @returns The next direction the guard will turn to when hitting an obstacle.
 */
function getNextDirection(): string {
    let nextDir = ((dirs.findIndex(d => d === guardDir) + 1) % dirs.length + dirs.length) % dirs.length;
    return dirs[nextDir];
}

/**
 * Checks is a set of coords are in the bounds of the map.
 * @param y y-coord
 * @param x x-coord
 * @returns Whether or not the coords are within the bounds of the map.
 */
function isInBounds(y: number, x: number): boolean {
    if (y >= 0 && y < yMax && x >= 0 && x < xMax) {
        return true;
    }
    else {
        return false;
    }
}


/**
 * Counts the number of tiles traversed by the guard.
 * @returns The number of tiles traversed by the guard.
 */
function countPath(): number {
    let count = 0;
    for (let j = 0; j < yMax; j++) {
        for (let i = 0; i < xMax; i++) {
            if (map[j][i] === "X") {
                count++;
            }
        }
    }
    return count;
}

/**
 * Prints map to console.
 */
function printMap(): void {
    for (let j = 0; j < yMax; j++) {
        console.log(map[j].join(""));
    }
    console.log("--------");
}