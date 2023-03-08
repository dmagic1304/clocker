import React, { useState, useEffect } from 'react';
import { format, intervalToDuration } from 'date-fns';
import { db, auth } from './../firebase';
import { addDoc, collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

export default function Hours() {

  const timesQuery = async () => {
    const times = [];
    const collectionRef = collection(db, 'user');
    const q = query(collectionRef, where('HoursWorked', '!=', null));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      times.push({
        ClockIn: doc.data().ClockIn.toDate(),
        ClockOut: doc.data().ClockOut.toDate(),
      });
    });
    setTimestamps(times);
  };

  useEffect(() => {
    timesQuery();
  }, []);


  return (
    <div>Hours</div>
  )
}
