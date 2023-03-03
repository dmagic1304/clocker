import React, { useState, useEffect } from 'react'
import { db } from './../firebase'
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';

export default function Calendar() {
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
    console.log('times st ' + timestamps)
    setTimestamps(times);
  }

  useEffect(() => {
    timesQuery()
  }, []);



  return (
    <div>
      {timestamps.map((stamp, index) => (
        <div key={index}>
          <p>{stamp.ClockIn.toString()}</p>
          <p>{stamp.ClockOut.toString()}</p>
        </div>
      ))}
    </div>
  )
}
