import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import About from './pages/About'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GamePage from "./pages/GamePage";





export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gamepage" element={<GamePage />} />
      </Routes>
    </>
  )
}
