import React, { useState, useEffect } from 'react';
import { format, intervalToDuration } from 'date-fns';
import { db, auth } from './../firebase';
import { addDoc, collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

export default function Hours() {
  return (
    <div>Hours</div>
  )
}
