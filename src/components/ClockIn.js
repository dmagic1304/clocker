import React from 'react'
import { format } from 'date-fns'
import db from './../firebase.js';
import { addDoc, collection } from 'firebase/firestore';


export default function ClockIn() {
  const date = format(new Date(), 'Pp')
  let handleClockIn = async (newClockIn) => {
    const collectionRef = collection(db, "user");
    await addDoc(collectionRef, newClockIn);
  }

  return (
    <div>
      Welcome "name"  {/*get user name from authorization */}
      {date}
      <button onSubmit={handleClockIn({ date: date })}>Clock in</button>
    </div>
  )
}
