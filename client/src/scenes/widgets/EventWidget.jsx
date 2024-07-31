import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

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
      </Box>
    </WidgetWrapper>
  );
};

export default EventWidget;