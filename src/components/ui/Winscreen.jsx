import React from 'react'
import { MdOutlineReplay} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Winscreen = (props) => {
    return (
        <>
            <div className='h-screen w-screen absolute flex justify-center items-center'>
                <div className='h-50 w-80 p-5 rounded-2xl flex flex-col items-center justify-between'>
                    {props.result == "won" && <h1>🎉 You Won</h1>}
                    {props.result == "lost" && <h1>   You Lost</h1>}
                    <div className='flex flex-col gap-2'>
                        <Link to={"/"} onClick={() => setmode("hard")} className='bg-blue-300 py-2 w-50 text-xl flex justify-center items-center gap-1 rounded-2xl' ><FaHome/>Home</Link>
                        <Link onClick={() => window.location.reload()} className='bg-blue-300 py-2 w-50 text-xl flex justify-center items-center gap-1 rounded-2xl' ><MdOutlineReplay/>Play Again</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Winscreen