import React from 'react'
import Sidebar from './Sidebar'
import ClockIn from './ClockIn'
import { Grid, Typography } from '@mui/material'
import { auth } from '../firebase'

export default function Profile() {
  return (
    <div>
      <Grid container>
        <Grid item md={4}>
          <Typography>
            Welcome {auth.currentUser.displayName}!
          </Typography>
        </Grid>
        <Grid item md={8}>
          <ClockIn />
        </Grid>
      </Grid >
    </div>
  )
}
