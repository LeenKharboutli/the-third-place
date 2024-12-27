//TODO: update so it uses Redux for state management. Works for now. 

import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, useTheme } from '@mui/material';

const localizer = momentLocalizer(moment);

const CalendarWidget = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const theme = useTheme();
  const token = useSelector((state) => state.token);

// useEffect hook in React is used to perform side effects in functional components. In this case, it's being used to fetch event data when the component mounts or when the userId changes.
  useEffect(() => {
    const fetchEvents = async () => {
      try { 

        const response = await fetch(`http://localhost:3001/events/${userId}/joinedevents`, 
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        // This parses the JSON response and then formats the events to match the structure expected by the Calendar component. It assumes each event has a 1-hour duration.
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: new Date(event.time),
          end: new Date(moment(event.time).add(1, 'hours')), // Assume 1 hour duration if no end time
          allDay: false,
          resource: event,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userId]); //The empty array [] as the second argument would make it run only once when the component mounts, but here it has [userId], so it will re-run if userId changes.

  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0.25rem',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.75rem"
      padding="1rem"
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>My Events</Typography>
      <Box style={{ height: '400px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ 
            height: '100%',
            fontSize: '0.8rem',
          }}
          views={['month']}
        //   toolbar={false}
          eventPropGetter={eventStyleGetter}
        />
      </Box>
    </Box>
  );
};

export default CalendarWidget;
