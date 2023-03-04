import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from './../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';


export default function UserCalendar() {
  const [timestamps, setTimestamps] = useState([]);
  const [error, setError] = useState(null);

  const timesQuery = async () => {
    const times = [];
    const collectionRef = collection(db, "user");
    const q = query(collectionRef, where("ClockOut", "!=", null));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      times.push({
        ClockIn: doc.data().ClockIn.toDate(),
        ClockOut: doc.data().ClockOut.toDate()
      });
    });
    setTimestamps(times);
  }

  useEffect(() => {
    timesQuery()
  }, []);



  return (
    <div>
      <Calendar />
    </div>
  )
}
