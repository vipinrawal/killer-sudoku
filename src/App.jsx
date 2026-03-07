import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { randomColors, vertical, horizontal, difficulty, puzzledgrid, solvedgrid} from './script';
import Game from './components/pages/Game.jsx'
import Home from './components/pages/Home.jsx'
import { mistakes } from './components/contexts/Mycontext.jsx'



const App = () => {
  const [mis, setmis] = useState(0)

  return (
    <mistakes.Provider value={{ mis, setmis, difficulty, puzzledgrid, solvedgrid }}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
    </mistakes.Provider>
  )
}

export default App