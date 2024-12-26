import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setEvents, updateEvent, deleteEvent } from "state/eventSlice";
import { useState } from "react";

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

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTime, setEditTime] = useState(time);
  const [editLocation, setEditLocation] = useState(location);

  const isEventCreator = eventUserId === loggedInUserId;
  const hasJoined = attendees.includes(loggedInUserId);

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${eventId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          time: editTime,
          location: editLocation,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedEvent = await response.json();
      dispatch(updateEvent({ event: updatedEvent }));
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch(deleteEvent({ eventId }));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

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
      dispatch(setEvents({ event: updatedEvent }));
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
        {isEventCreator && (
          <Box>
            <IconButton onClick={() => setIsEditDialogOpen(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        )}
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
        {!hasJoined && (
          <Button onClick={joinEvent} variant="contained" sx={{ mt: 1 }}>
            Join Event
          </Button>
        )}
        {hasJoined && (
          <Button onClick={joinEvent} variant="contained" sx={{ mt: 1 }}>
            Unjoin Event
          </Button>
        )}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Time"
            type="datetime-local"
            fullWidth
            value={new Date(editTime).toISOString().slice(0, 16)}
            onChange={(e) => setEditTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default EventWidget;
