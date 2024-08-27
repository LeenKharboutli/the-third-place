import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "state/eventSlice";

const EventWidget = ({
  eventId,
  eventUserId,
  title,
  description,
  time,
  location,
  attendees,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const joinEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${eventId}/join`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: loggedInUserId,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedEvent = await response.json();
      console.log("Event joined successfully:", updatedEvent);
      dispatch(setEvents({ event: updatedEvent }));
      // setTitle("");
      // setDescription("");
      // setTime("");
      // setLocation("");
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };



  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          {title}
        </Typography>
      </FlexBetween>
      <Typography color={medium} fontSize="0.75rem">
        {new Date(time).toLocaleString()}
      </Typography>
      <Typography color={medium} fontSize="0.75rem">
        {location}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Box mt="0.5rem">
        <Typography color={medium} fontSize="0.75rem">
          Attendees: {attendees.length}
        </Typography>
        {/*TODO: I've gotta improve the styling of this */}
        <Button onClick={joinEvent}>
          Join Event
        </Button> 
      </Box>
    </WidgetWrapper>
  );
};

export default EventWidget;