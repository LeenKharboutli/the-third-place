import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const CreateEventWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleEvent = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("time", time);
    formData.append("location", location);

    try {
      const response = await fetch(`http://localhost:3001/events`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: _id,
          title,
          description,
          time,
          location
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const events = await response.json();
      console.log("Event created successfully:", events);
      dispatch(setEvents({ events }));
      setTitle("");
      setDescription("");
      setTime("");
      setLocation("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <Typography
          variant="h4"
          color={palette.neutral.dark}
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Create Event
        </Typography>
      </FlexBetween>
      <Box
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="1rem"
        p="1rem"
      >
        <TextField
          label="Event Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          label="Event Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
          multiline
          rows={4}
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          label="Event Time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          name="time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          label="Event Location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          name="location"
          sx={{ width: "100%" }}
        />
      </Box>

      <Button
        disabled={!title || !description || !time || !location}
        onClick={handleEvent}
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
          marginTop: "1rem",
        }}
      >
        CREATE
      </Button>
    </WidgetWrapper>
  );
};

export default CreateEventWidget;