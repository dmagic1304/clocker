import { Box, Grid } from '@mui/material'
import React from 'react'
import Navigation from './Navigation'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <Box>
      <Grid container>
        <Grid item>
          <img src={logo} alt="logo" />
        </Grid >
        <Grid item>
          <Navigation />
        </Grid>
      </Grid>
    </Box>
  )
}
