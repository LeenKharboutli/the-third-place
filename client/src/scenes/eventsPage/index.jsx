import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CalendarWidget from "scenes/widgets/CalendarWidget";
import EventWidget from "scenes/widgets/EventWidget";
import WidgetWrapper from "components/WidgetWrapper";
import Navbar from "scenes/navbar";

const EventsPage = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.events) || [];

  // Filter events for joined and created
  const joinedEvents = events.filter((event) => 
    event.attendees.includes(user._id)
  );
  const createdEvents = events.filter((event) => 
    event.userId === user._id
  );

  return (
    
    <Box>
      <Navbar />

      <Box      
      width="100%"
      padding="2rem 6%"
      display="flex"
      gap="2rem"
      flexDirection="column">
        <Box>
          <CalendarWidget userId={user._id} />
        </Box>

        <Box>
          <WidgetWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
              All Joined Events
            </Typography>
            {joinedEvents.map(({
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
            ))}
          </WidgetWrapper>
        </Box>

        <Box>
          <WidgetWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
              All Created Events
            </Typography>
            {createdEvents.map(({
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
            ))}
          </WidgetWrapper>
        </Box>
      </Box>
    </Box>
  );
};

export default EventsPage;
