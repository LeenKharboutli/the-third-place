import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import EventWidget from "./EventWidget";

const EventsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events) || [];
  const token = useSelector((state) => state.token);

  const getEvents = async () => {
    const response = await fetch("http://localhost:3001/events", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setEvents({ events: Array.isArray(data) ? data : [] }));
  };

  const getUserEvents = async () => {
    const response = await fetch(
      `http://localhost:3001/events/${userId}/events`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setEvents({ events: Array.isArray(data) ? data : [] }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserEvents();
    } else {
      getEvents();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
    </>
  );
};

export default EventsWidget;