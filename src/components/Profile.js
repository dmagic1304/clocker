import React from 'react'
import Sidebar from './Sidebar'
import ClockIn from './ClockIn'
import { Box, Grid, Typography } from '@mui/material'
import { auth } from '../firebase'

export default function Profile() {
  return (
    <Box sx={{ mt: 6 }}>
      <Grid container>
        <Grid item md={4}>
          <Typography variant='h2'>
            Welcome
          </Typography>
          <Typography variant='h2'>
            {auth.currentUser.displayName}!
          </Typography>
        </Grid>
        <Grid item md={8}>
          <ClockIn />
        </Grid>
      </Grid >
    </Box>
  )
}
