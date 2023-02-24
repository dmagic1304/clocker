import React from 'react'
import { NavLink } from "react-router-dom";


export default function Navigation() {
  return (
    <nav>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/SignIn">
        Sign In
      </NavLink>
    </nav>
  )
}
