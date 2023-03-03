import React, { useState, useEffect } from 'react';
import { format, intervalToDuration } from 'date-fns';
import { db, auth } from './../firebase';
import { addDoc, collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

export default function ClockIn() {
  const [user, setUser] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [working, setWorking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0)


  // const clockInTime = format(new Date(), 'Pp');

  const previousStatus = async () => {
    const collectionRef = collection(db, "user");
    const q = query(collectionRef, orderBy("ClockIn", "desc"), limit(1));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      setClockInTime(doc.data().ClockIn.toDate());
      setWorking(true);
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
    const collectionRef = collection(db, "user");
    await addDoc(collectionRef, { ClockIn: new Date(), ClockOut: null });
    setWorking(true);
  }

  const handleClockOut = async () => {
    const collectionRef = collection(db, "user");
    await addDoc(collectionRef, { ClockIn: clockInTime, ClockOut: new Date() });
    setWorking(false);
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