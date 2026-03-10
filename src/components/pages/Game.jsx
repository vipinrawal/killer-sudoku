import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiEraser } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { mistakes } from '../contexts/Mycontext';
import {validation, value, puzzledgrid, solvedgrid, changeDifficulty, difficulty} from '../../script';
import Winscreen from '../ui/Winscreen';
import { useParams } from 'react-router-dom';


const Game = () => {
    const { mis, setmis } = useContext(mistakes);
    const { mode } = useParams();
    const [seconds, setseconds] = useState(0);
    const [warning, setwarning] = useState("");
    const [won, setwon] = useState(false);
    const [lost, setlost] = useState(false);
    const [note, setnote] = useState(false)

    useEffect(() => {
        changeDifficulty(mode)
    }, []);

    const checkWin = () => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (puzzledgrid[r][c] !== solvedgrid[r][c]) {
                    return false;
                }
            }
        }
        return true;
    };

    let digit = null;
    const handleClick = (e) => {
        digit = e.target.innerText ? e.target.innerText : 0;

        let row = value.id.split("")[8];
        let col = value.id.split("")[18];


        if (digit == 0 && puzzledgrid[row][col] == "-") {
            value.innerText = ""
        } else if (puzzledgrid[row][col] == "-" && solvedgrid[row][col] == digit) {
            value.style.color = "black";
            value.innerText = digit;
            puzzledgrid[row][col] = digit;
            if (checkWin()) {
                setwon(true);
            }
        } else if (puzzledgrid[row][col] == "-" && solvedgrid[row][col] != digit) {
            value.style.color = "red";
            value.innerText = digit;
            setmis(mis + 1)
            if (mis + 1 >= 3) {
                setlost(true)
            }
        } else {
            setwarning("The cell is already filled");
            setTimeout(() => {
                setwarning("")

            }, 3000);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setseconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [])


    const handleNotes = (e) => {
        digit = e ? e.target.innerText : 0;
        let row = value.id.split("")[8];
        let col = value.id.split("")[18];
        let newNote = value.querySelector(`#n-${digit}`)


        if (digit == 0 && puzzledgrid[row][col] == "-") {
            value.innerText = ""
        } else if (puzzledgrid[row][col] == "-" && newNote.innerText == "") {
            newNote.style.fontSize = "10px"
            newNote.innerText += digit;
        } else if (!newNote.innerText == "") {
            newNote.innerText = "";
        }
        else {
            setwarning("The cell is already filled");
            setTimeout(() => {
                setwarning("")

            }, 3000);
        }

    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <>
            <div id="main" >

                <h1 className='w-full flex justify-center absolute top-20'>{warning}</h1>
                <div id="main-grid" className='relative' style={{ display: won || lost ? 'none' : 'block' }}>
                    <div id="upper-container">
                        <p>Difficulty : {difficulty}</p>
                        <p>Mistakes : {mis} / 3</p>
                        <p>Time : {minutes < 10 ? "0" : ""}{minutes}:{remainingSeconds < 10 ? "0" : ""}{remainingSeconds}</p>
                    </div>

                    <div className='h-auto w-auto left-full top-13 absolute'>
                        <FaPencilAlt onClick={() => !note ? setnote(true) : setnote(false)} className=' text-4xl h-10 w-10 p-1 border border-black border-l-0' style={{ color: note && "skyblue" }} />
                        <CiEraser onClick={handleClick} className='active:text-red-500 text-4xl h-10 w-10 border border-l-0' />
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
                <div id="keypad" style={{ display: won || lost ? 'none' : 'flex' }} onClick={note ? handleNotes : handleClick}>
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
                {won && (
                    <Winscreen result="won" />
                )}
                {lost && (
                    <Winscreen result="lost" />
                )}
            </div>
        </>
    );
};

export default Game;
