import { getFileLines } from "./ReadFileLines";

let fileName: string = "6.txt";
let map: string[] = getFileLines(fileName);
const xMax: number = map[0].length;
const yMax: number = map.length;
let guardLoc: number[] = [];

export function main(): void {
    guardLoc = getGuardLoc();
    console.log("Guard at: " + guardLoc);
}

function getGuardLoc(): number[] {
    let chr = "";
    for (let j = 0; j < yMax; j++) {
        for (let i = 0; i < xMax; i++) {
            chr = map[j][i];
            if (chr === "^" || chr === "v" || chr === "<" || chr === ">") {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

function moveGuard(): void {
    let guard = map[guardLoc[1]][guardLoc[0]];
    if (guard === "^") {
        
    }
    else if (guard === "v") {

    }
    else if (guard === "<") {

    }
    else if (guard === "<") {
        
    }
}