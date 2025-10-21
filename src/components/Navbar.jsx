import React from 'react'
import { NavLink } from 'react-router-dom'






export default function Navbar() {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/" end>Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/gamepage">Game</NavLink>
 
      

    </nav>
  )
}


