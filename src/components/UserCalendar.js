import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from './../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';



export default function UserCalendar() {
  const [timestamps, setTimestamps] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  const timesQuery = async () => {
    const times = [];
    const collectionRef = collection(db, 'user');
    const q = query(collectionRef, where('ClockOut', '!=', null));
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

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const matchingTimestamps = timestamps.filter((timestamp) => {
        const timestampDate = timestamp.ClockIn.getDate();
        const timestampMonth = timestamp.ClockIn.getMonth();
        const timestampYear = timestamp.ClockIn.getFullYear();
        return day === timestampDate && month === timestampMonth && year === timestampYear;
      });
      return (
        <div>
          {matchingTimestamps.map((timestamp, index) => (
            <div key={index}>
              <p>Clock In: {timestamp.ClockIn.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Clock Out: {timestamp.ClockOut.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Calendar value={date} onChange={setDate} tileContent={tileContent} />
    </div>
  );
}