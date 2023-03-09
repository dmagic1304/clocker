import React from 'react'
import Sidebar from './Sidebar'
import ClockIn from './ClockIn'
import { Grid } from '@mui/material'

export default function Profile() {
  return (
    <div>
      <Grid container>
        <Grid item md={4}>
          <Sidebar />
        </Grid>
        <Grid item md={8}>
          <ClockIn />
        </Grid>
      </Grid >
    </div>
  )
}
