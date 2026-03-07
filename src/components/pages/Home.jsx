import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
        <div className='w-screen h-screen flex-col flex justify-around items-center'>
            <div className='flex flex-col items-center'> 
            <h1 className='font-semibold'>Killer Sudoku</h1>
            <h2 className='w-auto h-auto text-xs '>By : Vipin Rawal</h2>
            </div>
            <div className='flex flex-col gap-1'>
            <Link to={"/game"} className='bg-blue-300 px-0.5 w-20 flex justify-center rounded-2xl' >Easy</Link>
            <Link to={"/game"} className='bg-blue-300 px-0.5 w-20 flex justify-center rounded-2xl' >Medium</Link>
            <Link to={"/game"} className='bg-blue-300 px-0.5 w-20 flex justify-center rounded-2xl' >Hard</Link>
            <Link to={"/game"} className='bg-blue-300 px-0.5 w-20 flex justify-center rounded-2xl' >Expert</Link>
            </div>
        </div>
        </>
    )
}

export default Home