import { db, auth } from './../firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate, getDate, getApi, startOfMonth, endOfMonth } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, useTheme, Button, Checkbox, FormGroup, FormControl, FormControlLabel } from "@mui/material";
import Modal from '@mui/material/Modal';
import { tokens } from "./../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timestamps, setTimestamps] = useState([]);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);

  const timesQuery = async () => {
    const times = [];
    const collectionRef = collection(db, `${auth.currentUser.uid}`);
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

  const handleDateClick = (selected) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
            select={handleDateClick}
            editable={true}
          // eventClick={handleEventClick}
          />
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">New Request</h2>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Request time off" />
            <FormControlLabel control={<Checkbox />} label="Request extra hours" />
          </FormGroup>
          <Button onClick={handleClose}>Submit Request</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
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


// const handleEventClick = (selected) => {
//   if (
//     window.confirm(
//       `Are you sure you want to delete the event '${selected.event.title}'`
//     )
//   ) {
//     const collectionRef = collection(db, `${auth.currentUser.uid}`);
//     const docRef = query(collectionRef, where('ClockOut', '==', selected.event.end));
//     deleteDoc(docRef)
//       .then(() => {
//         console.log('Document successfully deleted!');
//         selected.event.remove();
//       })
//       .catch((error) => {
//         console.error('Error deleting document: ', error);
//       });
//   }
// };
