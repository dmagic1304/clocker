import React, { useState, useEffect } from 'react'
import { db } from './../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function Calendar() {
  const [timestamps, setTimestamps] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "user"), where("ClockOut", "!=", null)),
      (collectionSnapshot) => {
        const times = [];
        collectionSnapshot.forEach((doc) => {
          times.push({
            ClockIn: doc.data().ClockIn,
            ClockOut: doc.data().ClockOut
          });
        });
        setTimestamps(times);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  return (
    <div>
      {timestamps.forEach((stamp) => {
        <div>
          <p>{stamp.ClockIn}</p>
          <p>{stamp.ClockOut}</p>
        </div>
      })}
    </div>
  )
}
