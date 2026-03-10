import {
    generateKillerSudoku,
    getSeparationsFromAreas,
} from "killer-sudoku-generator";

export let sudoku = generateKillerSudoku("easy");
export let { puzzle, solution, areas, difficulty } = sudoku;
export let { verticalSeparations } = getSeparationsFromAreas(areas);
export let puzzledgrid = [];
export let solvedgrid = [];


function buildGrids() {
    puzzledgrid = Array.from({ length: 9 }, () => []);
    solvedgrid = Array.from({ length: 9 }, () => []);

    const puzzled = puzzle.split("");
    const solved = solution.split("");

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            puzzledgrid[i].push(puzzled[i * 9 + j]);
            solvedgrid[i].push(solved[i * 9 + j]);
        }
    }
}

buildGrids();


export function changeDifficulty(newDifficulty) {
    sudoku = generateKillerSudoku(newDifficulty);
    ({ puzzle, solution, areas, difficulty } = sudoku);
    ({ verticalSeparations } = getSeparationsFromAreas(areas));

    buildGrids();

    // Re-render everything
    randomColors();
    vertical();
    horizontal();
}

export function randomColors() {
    let value = areas
    const colors = ["pink", "lightblue", "lightgreen", "lightyellow"];
    document.querySelectorAll("span").forEach((span) => {
        span.innerText = ""
    })

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
    const parent = document.getElementById('grid2');
    const divs = parent.querySelectorAll('div');

    divs.forEach(div => {
        div.querySelector("p").style.border = "none"

    });
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
    if (element.innerText == "") {
        element.innerHTML = `<div style="display:grid; grid-template-columns: repeat(3, 10px); line-height: 1;">
            <div id='n-1'></div>
            <div id='n-2'></div>
            <div id='n-3'></div>
            <div id='n-4'></div>
            <div id='n-5'></div>
            <div id='n-6'></div>
            <div id='n-7'></div>
            <div id='n-8'></div>
            <div id='n-9'></div>
            </div>`
    }
    document.querySelectorAll(".cells").forEach((val) => {
        val.classList.remove("active");
    });


    element.classList.add("active");
    value = element;
}
