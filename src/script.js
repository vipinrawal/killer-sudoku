import {
    generateKillerSudoku,
    getSeparationsFromAreas,
} from "killer-sudoku-generator";

const sudoku = generateKillerSudoku("easy");
export const { puzzle, solution, areas, difficulty } = sudoku;
export const { verticalSeparations } = getSeparationsFromAreas(areas);

const puzzled = puzzle.split("");
export const puzzledgrid = [[], [], [], [], [], [], [], [], []];
const solved = solution.split("");
export const solvedgrid = [[], [], [], [], [], [], [], [], []];
let count = 0;

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        puzzledgrid[i].push(puzzled[count]);
        count++;
    }
}
let count2 = 0;
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        solvedgrid[i].push(solved[count2]);
        count2++;
    }
}

export function randomColors() {
    let value = areas
    const colors = ["pink", "lightblue", "lightgreen", "lightyellow"];

    value.forEach((val) => {
        var rand = Math.floor(Math.random() * colors.length);
        let sorted = val.cells.sort((a, b) => a[0] - b[0]);
        sorted = sorted.sort((a, b) => a[1] - b[1]);
        val.cells.forEach((cells) => {
            var color = colors[rand];
            document.getElementById(
                `row${cells[0]} col${cells[1]}`,
            ).style.backgroundColor = color;
        });

        document.getElementById(
            `divrow${sorted[0][0]} divcol${sorted[0][1]}`,
        ).innerHTML += `<span>${val.sum}</span>`;
    });
}

export function vertical() {
    verticalSeparations.forEach((val) => {
        document.getElementById(`row${val[0]} col${val[1]}`).style.borderRight =
            "2px dashed rgba(0, 0, 0, 0.5)";
    });
}

export function horizontal() {
    const cages = areas;
    const cellCageMap = Array.from({ length: 9 }, () => Array(9).fill(-1));
    cages.forEach((cage, i) => {
        cage.cells.forEach(([r, c]) => (cellCageMap[r][c] = i));
    });

    function buildGrid() {
        const grid = document.getElementById("grid");
        grid.innerHTML = "";

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = document.createElement("p");
                cell.className = "cell";

                const myCage = cellCageMap[r][c];
                const sameAbove = r > 0 && cellCageMap[r - 1][c] === myCage;

                cell.style.borderTop = sameAbove
                    ? "0px solid black"
                    : "2px dashed rgba(0, 0, 0, 0.5)";
                cell.style.borderBottom = r === 8 ? "none" : "none";
                cell.style.borderLeft = "none";
                cell.style.borderRight = "none";

                grid.appendChild(cell);
            }
        }
    }
    buildGrid();
}

export let value = null;
export function validation(row = 1, col = 1) {
    let element = document.getElementById(`digitrow${row} digitcol${col}`);
    document.querySelectorAll(".cells").forEach((val) => {
        val.classList.remove("active");
    });

    element.classList.add("active");
    value = element;
}
