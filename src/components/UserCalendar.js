// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { db } from './../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';



// export default function UserCalendar() {
//   const [timestamps, setTimestamps] = useState([]);
//   const [error, setError] = useState(null);
//   const [date, setDate] = useState(new Date());

//   const timesQuery = async () => {
//     const times = [];
//     const collectionRef = collection(db, 'user');
//     const q = query(collectionRef, where('ClockOut', '!=', null));
//     const snapshot = await getDocs(q);
//     snapshot.forEach((doc) => {
//       times.push({
//         ClockIn: doc.data().ClockIn.toDate(),
//         ClockOut: doc.data().ClockOut.toDate(),
//       });
//     });
//     setTimestamps(times);
//   };

//   useEffect(() => {
//     timesQuery();
//   }, []);

//   const tileContent = ({ date, view }) => {
//     if (view === 'month') {
//       const day = date.getDate();
//       const month = date.getMonth();
//       const year = date.getFullYear();
//       const matchingTimestamps = timestamps.filter((timestamp) => {
//         const timestampDate = timestamp.ClockIn.getDate();
//         const timestampMonth = timestamp.ClockIn.getMonth();
//         const timestampYear = timestamp.ClockIn.getFullYear();
//         return day === timestampDate && month === timestampMonth && year === timestampYear;
//       });
//       return (
//         <div>
//           {matchingTimestamps.map((timestamp, index) => (
//             <div key={index}>
//               <p>Clock In: {timestamp.ClockIn.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</p>
//               <p>Clock Out: {timestamp.ClockOut.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</p>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       return null;
//     }
//   };

//   return (
//     <div>
//       <Calendar value={date} onChange={setDate} tileContent={tileContent} />
//     </div>
//   );
// }

import { db } from './../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "./../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timestamps, setTimestamps] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);


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

  useEffect(() => {
    const events = timestamps.map(({ ClockIn, ClockOut }) => ({
      id: `${ClockIn}-${ClockOut}`,
      title: "Shift",
      start: formatDate(ClockIn, { timeZone: "UTC" }),
      end: formatDate(ClockOut, { timeZone: "UTC" }),
    }));
    console.log("events" + events[0])
    setInitialEvents(events);
  }, [timestamps]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">

      {/* CALENDAR */}
      <Box flex="1 1 100%" ml="15px">
        <FullCalendar
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setTimestamps(events)}
          initialEvents={initialEvents}
        />
      </Box>
    </Box>

  );
};

export default Calendar;