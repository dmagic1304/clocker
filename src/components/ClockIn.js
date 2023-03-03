import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { db, auth } from './../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function ClockIn() {
  const [user, setUser] = useState(null);
  const date = format(new Date(), 'Pp');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  let handleClockIn = async (newClockIn) => {
    const collectionRef = collection(db, "user");
    await addDoc(collectionRef, newClockIn);
    console.log("test");
  };

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      Welcome !
      {date}
      <button onClick={() => handleClockIn({ test: "test data" })}>Clock in</button>
    </div>
  );
}