// TODO: Figure out Redux for this... placeSlice vs. using state? 

// import {
//   Box,
//   Button,
//   Typography,
//   useTheme,
//   IconButton,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import FlexBetween from "components/FlexBetween";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useSelector, useDispatch } from "react-redux";
// import { setEvents, updateEvent, deleteEvent } from "state/eventSlice";
// import { useState } from "react";

// const PlaceWidget = ({
//   eventId,
//   eventUserId,
//   title,
//   description,
//   time,
//   location,
//   attendees,
// }) => {
//   const { palette } = useTheme();
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;
//   const token = useSelector((state) => state.token);
//   const loggedInUserId = useSelector((state) => state.user._id);
//   const dispatch = useDispatch();

//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editTitle, setEditTitle] = useState(title);
//   const [editDescription, setEditDescription] = useState(description);
//   const [editTime, setEditTime] = useState(time);
//   const [editLocation, setEditLocation] = useState(location);

//   const isEventCreator = eventUserId === loggedInUserId;
//   const hasJoined = attendees.includes(loggedInUserId);

//   const handleEditSubmit = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/events/${eventId}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           title: editTitle,
//           description: editDescription,
//           time: editTime,
//           location: editLocation,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedEvent = await response.json();
//       dispatch(updateEvent({ event: updatedEvent }));
//       setIsEditDialogOpen(false);
//     } catch (error) {
//       console.error("Error updating event:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/events/${eventId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       dispatch(deleteEvent({ eventId }));
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

//   const joinEvent = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/events/${eventId}/join`, {
//         method: "PATCH",
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userId: loggedInUserId,
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const updatedEvent = await response.json();
//       dispatch(setEvents({ event: updatedEvent }));
//     } catch (error) {
//       console.error("Error joining event:", error);
//     }
//   };

//   return (
//     <WidgetWrapper m="2rem 0">
//       <FlexBetween>
//         <Typography color={main} variant="h5" fontWeight="500">
//           {title}
//         </Typography>
//         {isEventCreator && (
//           <Box>
//             <IconButton onClick={() => setIsEditDialogOpen(true)}>
//               <Edit />
//             </IconButton>
//             <IconButton onClick={handleDelete}>
//               <Delete />
//             </IconButton>
//           </Box>
//         )}
//       </FlexBetween>
//       <Typography color={medium} fontSize="0.75rem">
//         {new Date(time).toLocaleString()}
//       </Typography>
//       <Typography color={medium} fontSize="0.75rem">
//         {location}
//       </Typography>
//       <Typography color={main} sx={{ mt: "1rem" }}>
//         {description}
//       </Typography>
//       <Box mt="0.5rem">
//         <Typography color={medium} fontSize="0.75rem">
//           Attendees: {attendees.length}
//         </Typography>
//         {!hasJoined && (
//           <Button onClick={joinEvent} variant="contained" sx={{ mt: 1 }}>
//             Join Event
//           </Button>
//         )}
//         {hasJoined && (
//           <Button onClick={joinEvent} variant="contained" sx={{ mt: 1 }}>
//             Unjoin Event
//           </Button>
//         )}
//       </Box>

//       {/* Edit Dialog */}
//       <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
//         <DialogTitle>Edit Event</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Title"
//             fullWidth
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Description"
//             fullWidth
//             multiline
//             rows={4}
//             value={editDescription}
//             onChange={(e) => setEditDescription(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="datetime-local"
//             fullWidth
//             value={new Date(editTime).toISOString().slice(0, 16)}
//             onChange={(e) => setEditTime(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             margin="dense"
//             label="Location"
//             fullWidth
//             value={editLocation}
//             onChange={(e) => setEditLocation(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleEditSubmit} variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </WidgetWrapper>
//   );
// };

// export default PlaceWidget;


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
  Chip,
} from "@mui/material";
import {
  Edit,
  Delete,
  LocationOn,
  Verified as VerifiedIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setPlaces } from "state";
import { useState } from "react";

const PlaceWidget = ({
  placeId,
  placeName,
  placeAddress,
  description,
  category,
  location,
  owner,
  isVerified,
  googlePlaceId,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: placeName,
    address: placeAddress,
    description: description || "",
    category: category || "",
    latitude: location?.coordinates[1] || "",
    longitude: location?.coordinates[0] || "",
  });

  const isOwner = owner === loggedInUserId;

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/places/${placeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: editData.name,
          address: editData.address,
          description: editData.description,
          category: editData.category,
          location: {
            type: "Point",
            coordinates: [parseFloat(editData.longitude), parseFloat(editData.latitude)]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPlace = await response.json();
      // Fetch all places to update the state
      const placesResponse = await fetch("http://localhost:3001/places", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const places = await placesResponse.json();
      dispatch(setPlaces({ places }));
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/places/${placeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Fetch updated places list
      const placesResponse = await fetch("http://localhost:3001/places", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const places = await placesResponse.json();
      dispatch(setPlaces({ places }));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  const handleClaimPlace = async () => {
    try {
      const response = await fetch(`http://localhost:3001/places/${placeId}/claim`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Fetch updated places list
      const placesResponse = await fetch("http://localhost:3001/places", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const places = await placesResponse.json();
      dispatch(setPlaces({ places }));
    } catch (error) {
      console.error("Error claiming place:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <Box>
          <Typography color={main} variant="h5" fontWeight="500" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {placeName}
            {isVerified && (
              <VerifiedIcon sx={{ color: palette.primary.main, fontSize: "20px" }} />
            )}
            {googlePlaceId && (
              <StoreIcon sx={{ color: palette.primary.light, fontSize: "20px" }} />
            )}
          </Typography>
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
        <Box>
          {isOwner && (
            <>
              <IconButton onClick={() => setIsEditDialogOpen(true)}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            </>
          )}
          {!owner && (
            <Button 
              onClick={handleClaimPlace}
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
            >
              Claim Place
            </Button>
          )}
        </Box>
      </FlexBetween>

      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOn sx={{ color: medium }} />
        <Typography color={medium}>
          {placeAddress}
        </Typography>
      </Box>

      {description && (
        <Typography color={main} sx={{ mt: 2 }}>
          {description}
        </Typography>
      )}

      {/* Edit Dialog */}
      <Dialog 
        open={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Place</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={editData.name}
              onChange={handleInputChange}
            />
            <TextField
              name="address"
              label="Address"
              fullWidth
              value={editData.address}
              onChange={handleInputChange}
            />
            <TextField
              name="category"
              label="Category"
              fullWidth
              value={editData.category}
              onChange={handleInputChange}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editData.description}
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                name="latitude"
                label="Latitude"
                type="number"
                value={editData.latitude}
                onChange={handleInputChange}
                inputProps={{ step: "any" }}
              />
              <TextField
                name="longitude"
                label="Longitude"
                type="number"
                value={editData.longitude}
                onChange={handleInputChange}
                inputProps={{ step: "any" }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PlaceWidget;