import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setEvents } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import EventWidget from "./EventWidget";
import FlexBetween from "components/FlexBetween";

const JoinedEventsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <FlexBetween>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          My Joined Events
        </Typography>
        <Button
          onClick={() => navigate("/events")}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              backgroundColor: palette.primary.light,
            },
          }}
        >
          View All Events
        </Button>
      </FlexBetween>
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
