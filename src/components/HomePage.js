import React from 'react'
import SignIn from './SignIn'
import clockerimg from './../assets/clockerimg.jpg'
import { Box } from '@mui/system'

export default function HomePage() {
  return (

    <Box sx={{ mx: 4 }}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box sx={{ justifyContent: 'center', borderRadius: 10, overflow: "hidden", }}>
          <img src={clockerimg} alt="clockerimg" />
        </Box>
        <Box sx={{ justifyContent: 'center', ml: 2 }}>
          <SignIn />
        </Box>
      </Box >
    </Box>

  )
}
