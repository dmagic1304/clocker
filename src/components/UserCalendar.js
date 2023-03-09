import { db, auth } from './../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate, getDate, getApi, startOfMonth, endOfMonth } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, useTheme } from "@mui/material";
import { tokens } from "./../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timestamps, setTimestamps] = useState([]);
  const [hoursWorked, setHoursWorked] = useState(null);
  const calendarRef = useRef(null);

  const timesQuery = async () => {
    const times = [];
    const collectionRef = collection(db, `${auth.currentUser.displayName}`);
    const q = query(collectionRef, where('ClockOut', '!=', null));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      times.push({
        ClockIn: doc.data().ClockIn.toDate(),
        ClockOut: doc.data().ClockOut.toDate(),
        HoursWorked: doc.data().HoursWorked
      });
    });
    setTimestamps(times);
  };

  useEffect(() => {
    timesQuery();
  }, []);



  const events = timestamps.map(({ ClockIn, ClockOut, HoursWorked }) => ({
    id: `${ClockIn}-${ClockOut}`,
    title: "Shift",
    start: ClockIn,
    end: ClockOut,
    HoursWorked: HoursWorked
  }));

  const eventContent = (eventInfo) => {
    return (
      <div>
        <p>{eventInfo.event.extendedProps.HoursWorked} hours worked</p>
      </div>
    );
  };

  const calculateHoursWorked = () => {
    if (calendarRef.current) {
      const view = calendarRef.current.getApi().view;
      const start = view.activeStart;
      const end = view.activeEnd;

      console.log("test" + events);
      const eventsInCurrentView = events.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        return (
          eventStart.getTime() >= start.getTime() &&
          eventEnd.getTime() <= end.getTime()
        );
      });

      const hours = eventsInCurrentView.reduce((acc, event) => {
        return acc + event.HoursWorked;
      }, 0);

      setHoursWorked(hours);
    }
  }

  const handleDateClick = (arg) => {
    calculateHoursWorked();
  }




  return (
    <Box m="20px">
      {events.length > 0 && (
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
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventContent={eventContent}
            events={events}
            ref={calendarRef}
            viewDidMount={calculateHoursWorked}
          // select={handleDateClick}
          // eventClick={handleEventClick}
          />
        </Box>
      )}
    </Box>
  );
}

export default Calendar;

// const handleDateClick = (selected) => {
//   const title = prompt("Please enter a new title for your event");
//   const calendarApi = selected.view.calendar;
//   calendarApi.unselect();

//   if (title) {
//     calendarApi.addEvent({
//       id: `${selected.dateStr}-${title}`,
//       title,
//       start: selected.startStr,
//       end: selected.endStr,
//       allDay: selected.allDay,
//     });
//   }
// };

// const handleEventClick = (selected) => {
//   if (
//     window.confirm(
//       `Are you sure you want to delete the event '${selected.event.title}'`
//     )
//   ) {
//     selected.event.remove();
//   }
// };