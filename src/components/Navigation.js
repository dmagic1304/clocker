import React from 'react'
import { NavLink } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


export default function Navigation() {
  return (
    <nav>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/SignIn">
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/Profile">
        Profile
      </NavLink>
    </nav>
  )
}
