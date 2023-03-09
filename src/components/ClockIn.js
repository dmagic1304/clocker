import React, { useState, useEffect } from 'react';
import { format, intervalToDuration, differenceInHours, differenceInSeconds } from 'date-fns';
import { db, auth } from './../firebase';
import { addDoc, collection, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { Grid, Button, Typography } from '@mui/material';

export default function ClockIn() {
  const [user, setUser] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [working, setWorking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0)




  const previousStatus = async () => {
    const collectionRef = collection(db, `${auth.currentUser.displayName}`);
    const q = query(collectionRef, orderBy("TimeStamp", "desc"), limit(1));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      if (doc.data().ClockOut === null) {
        setClockInTime(doc.data().ClockIn.toDate());
        setWorking(true);
      }
    });
  }

  useEffect(() => {
    previousStatus()
  }, []);

  useEffect(() => {
    let interval;

    if (working) {
      interval = setInterval(() => {
        setElapsedTime(intervalToDuration({ start: clockInTime, end: new Date() }))
      })
    }
    return () => clearInterval(interval);
  }, [working]);

  const handleClockIn = async () => {
    setClockInTime(new Date());
    const collectionRef = collection(db, `${auth.currentUser.displayName}`);
    await addDoc(collectionRef, { ClockIn: new Date(), ClockOut: null, TimeStamp: new Date(), HoursWorked: null });
    setWorking(true);
  }

  const handleClockOut = async () => {
    const collectionRef = collection(db, `${auth.currentUser.displayName}`);
    let hoursWorked = differenceInHours(
      new Date(),
      clockInTime
    )
    console.log(hoursWorked)
    await addDoc(collectionRef, { ClockIn: clockInTime, ClockOut: new Date(), TimeStamp: new Date(), HoursWorked: hoursWorked });
    setClockInTime(null);
    setWorking(false);
  }


  if (working) {
    return (
      <div>
        <Typography variant='h4'>Clocked in for: {`${elapsedTime.hours} hours, ${elapsedTime.minutes} minutes and ${elapsedTime.seconds} seconds`}</Typography>
        <Typography variant='h4'>Current time: {format(new Date(), 'Pp')}</Typography>
        <Button variant="contained" color="primary" onClick={() => handleClockOut()}>
          Clock out
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Grid container>
        <Button variant="contained" color="primary" onClick={() => handleClockIn()}>
          Clock in
        </Button>

      </Grid>
    </div>
  );
}



   // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }