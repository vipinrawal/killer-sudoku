import React, { useContext, useEffect, useRef, useState } from 'react'
import { mistakes } from '../contexts/Mycontext';
import { randomColors, vertical, horizontal, validation, value } from '../../script';


const Game = () => {
    const { mis, setmis, difficulty, puzzledgrid, solvedgrid } = useContext(mistakes)
    const [seconds, setseconds] = useState(0)
    const [warning, setwarning] = useState("")

    useEffect(() => {
        randomColors();
        vertical();
        horizontal();
    }, []);

    let digit = null;
    const handleClick = (e) => {
        digit = e.target.innerText;
        let row = value.id.split("")[8];
        let col = value.id.split("")[18];

        if (puzzledgrid[row][col] == "-" && solvedgrid[row][col] == digit) {
            value.style.color = "black";
            value.innerText = digit;
            puzzledgrid[row][col] = digit;
        } else if (puzzledgrid[row][col] == "-" && solvedgrid[row][col] != digit) {
            value.style.color = "red";
            value.innerText = digit;
            setmis(mis + 1)
        } else {
        setwarning("The cell is already filled");
        const warn = setInterval(() => {
                setwarning("")
        }, 3000);

        return () => clearInterval(warn);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setseconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [])

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <>
            <div id="main">

                <div id="main-grid">
                    <h1 className='w-full flex justify-center'>{warning}</h1>
                    <div id="upper-container">
                        <p>Difficulty : {difficulty}</p>
                        <p>Mistakes : {mis} / 3</p>
                        <p>Time : {minutes < 10 ? "0" : ""}{minutes}:{remainingSeconds < 10 ? "0" : ""}{remainingSeconds}</p>
                    </div>
                    <div id="grid2">
                        {puzzledgrid.map((elem, row) =>
                            elem.map((value, col) => (
                                <div id={`divrow${row} divcol${col}`} key={col}>
                                    <p id={`row${row} col${col}`}></p>
                                </div>
                            )),
                        )}
                    </div>

                    <div id="grid"></div>

                    <div id="grid3">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div id="container">
                        {puzzledgrid.map((elem, row) =>
                            elem.map((value, col) => (
                                <p
                                    id={`digitrow${row} digitcol${col}`}
                                    className="cells"
                                    key={col}
                                    onClick={() => validation(row, col)}
                                >
                                    {value != "-" ? value : ""}
                                </p>
                            )),
                        )}
                    </div>
                </div>
                <div id="keypad" onClick={handleClick}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                </div>
            </div>
        </>
    );
};

export default Game;
