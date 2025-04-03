import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>Accueil</NavLink>
      <NavLink to="/projets">Projets</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  )
}