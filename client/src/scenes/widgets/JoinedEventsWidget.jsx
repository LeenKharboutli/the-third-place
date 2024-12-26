// Should this just be the "Next Event" widget? 
// If you click on this widget, it should take you to a general Events page...

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, useTheme } from "@mui/material";
import { setEvents } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import EventWidget from "./EventWidget";

const JoinedEventsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events) || [];
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const getJoinedEvents = async () => {
    const response = await fetch(
      `http://localhost:3001/events/${userId}/joinedevents`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setEvents({ events: Array.isArray(data) ? data : [] }));
  };

  useEffect(() => {
    getJoinedEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        My Joined Events
      </Typography>
      {Array.isArray(events) && events.map(
        ({
          _id,
          userId,
          title,
          description,
          time,
          location,
          attendees,
        }) => (
          <EventWidget
            key={_id}
            eventId={_id}
            eventUserId={userId}
            title={title}
            description={description}
            time={time}
            location={location}
            attendees={attendees}
          />
        )
      )}
    </WidgetWrapper>
  );
};

export default JoinedEventsWidget;
