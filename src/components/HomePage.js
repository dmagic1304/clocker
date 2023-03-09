import React from 'react'
import SignIn from './SignIn'
import clockerimg from './../assets/clockerimg.jpg'
import { Box } from '@mui/system'

export default function HomePage() {
  return (

    <Box sx={{ mx: 4 }}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box sx={{ justifyContent: 'center', border: 1 }}>
          <img src={clockerimg} alt="clockerimg" />
        </Box>
        <Box sx={{ justifyContent: 'center', border: 1 }}>
          <SignIn />
        </Box>
      </Box >
    </Box>

  )
}
