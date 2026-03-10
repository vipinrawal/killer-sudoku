import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { changeDifficulty } from '../../script'
import { mistakes } from '../contexts/Mycontext'

const Home = () => {
    const {mode, setmode} = useContext(mistakes)
    return (
        <>
        <div className='w-screen h-screen flex-col flex justify-around items-center'>
            <div className='flex flex-col items-center'> 
            <img src="/banner.jpg" alt="" className='h-90 w-90 rounded-2xl' />
            <h1 className='font-semibold text-3xl mt-2'>Killer Sudoku</h1>
            <h2 className='w-auto h-auto text-xl text-zinc-400' >By : Vipin Rawal</h2>
            </div>
            <div className='flex flex-col gap-2'>
            <Link to={"/game/easy"} onClick={()=> setmode("easy")} className='bg-blue-300 py-2 w-50 text-xl flex justify-center rounded-2xl' >Easy</Link>
            <Link to={"/game/medium"} onClick={()=> setmode("medium")} className='bg-blue-300 py-2 w-50 text-xl flex justify-center rounded-2xl' >Medium</Link>
            <Link to={"/game/hard"} onClick={()=> setmode("hard")} className='bg-blue-300 py-2 w-50 text-xl flex justify-center rounded-2xl' >Hard</Link>
            <Link to={"/game/expert"} onClick={()=> setmode("expert")} className='bg-blue-300 py-2 w-50 text-xl flex justify-center rounded-2xl' >Expert</Link>
            </div>
        </div>
        </>
    )
}

export default Home