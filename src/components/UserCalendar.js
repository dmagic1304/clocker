import { db } from './../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box } from "@mui/material";
import { tokens } from "./../theme";

const Calendar = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [timestamps, setTimestamps] = useState([]);

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

  const events = timestamps.map(({ ClockIn, ClockOut }) => ({
    id: `${ClockIn}-${ClockOut}`,
    title: "Shift",
    start: ClockIn,
    end: ClockOut,
  }));

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
          events={events}
          select={handleDateClick}
          eventClick={handleEventClick}
        />
      </Box>
    </Box>
  );
};

export default Calendar;

