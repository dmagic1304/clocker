import React, { useState, useEffect } from 'react';
import { format, intervalToDuration } from 'date-fns';
import { db, auth } from './../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function ClockIn() {
  const [user, setUser] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [working, setWorking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0)


  // const clockInTime = format(new Date(), 'Pp');

  useEffect(() => {
    let interval;

    if (working) {
      interval = setInterval(() => {
        setElapsedTime(intervalToDuration({ start: clockInTime, end: new Date() }))
      })
    }
    return () => clearInterval(interval);
  }, [working]);

  const handleClockIn = () => {
    setClockInTime(new Date());
    setWorking(true);
  }

  const handleClockOut = async (newClockIn) => {
    const collectionRef = collection(db, "user");
    await addDoc(collectionRef, newClockIn);
    console.log("succesfull db");
  }


  if (working) {
    return (
      <div>
        <span>Clocked in for:{`${elapsedTime.hours} hours, ${elapsedTime.minutes} minutes and ${elapsedTime.seconds} seconds`}</span>
        <span>Current time: {format(new Date(), 'Pp')}</span>
        <button onClick={() => handleClockOut()}>Clock out</button>
      </div>
    )
  }

  return (
    <div>
      Welcome !
      <button onClick={() => handleClockIn()}>Clock in</button>
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