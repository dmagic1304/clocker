import { useState, useEffect } from 'react'
import ClockIn from './ClockIn'
import { Box, Grid, Typography } from '@mui/material'
import { auth, db } from '../firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

export default function Profile() {


  const [monthWorked, setMonthWorked] = useState(null);
  const [weekWorked, setWeekWorked] = useState(null);

  const hoursQuery = async () => {
    const times = [];
    const collectionRef = collection(db, `${auth.currentUser.displayName}`);
    const q = query(collectionRef, where('HoursWorked', '!=', null));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      times.push({
        ClockIn: doc.data().ClockIn.toDate(),
        ClockOut: doc.data().ClockOut.toDate(),
        HoursWorked: doc.data().HoursWorked
      });
    });

    // Calculate monthWorked and weekWorked
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisWeek = getWeek(now);
    let monthWorked = 0;
    let weekWorked = 0;
    times.forEach((time) => {
      const timeMonth = time.ClockIn.getMonth();
      const timeWeek = getWeek(time.ClockIn);
      if (timeMonth === thisMonth) {
        monthWorked += time.HoursWorked;
      }
      if (timeWeek === thisWeek) {
        weekWorked += time.HoursWorked;
      }
    });

    setMonthWorked(monthWorked);
    setWeekWorked(weekWorked);
  };

  // Helper function to get the week number for a given date
  const getWeek = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };

  useEffect(() => {
    hoursQuery();
  }, []);




  return (
    <Box sx={{ mt: 6 }}>
      <Grid container>
        <Grid item md={4}>
          <Typography variant='h2'>
            Welcome
          </Typography>
          <Typography variant='h2' sx={{ mb: 4 }}>
            {auth.currentUser.displayName}!
          </Typography>
          <Typography variant='h5' sx={{ mb: 4 }} >
            Total hours worked this month: {monthWorked}
          </Typography>
          <Typography variant='h5' >
            Hours worked in current week:
          </Typography>
          <Typography variant='h4' >
            {weekWorked}
          </Typography>
        </Grid>
        <Grid item md={8}>
          <ClockIn />
        </Grid>
      </Grid >
    </Box>
  )
}
