// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";
// import {
//   Box,
//   Divider,
//   Typography,
//   InputBase,
//   useTheme,
//   Button,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Dropzone from "react-dropzone";
// import UserImage from "components/UserImage";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPlaces } from "state";

// const AddPlaceWidget = ({ picturePath }) => {
//   const dispatch = useDispatch();
//   const [isImage, setIsImage] = useState(false);
//   const [image, setImage] = useState(null);
//   const [place, setPlace] = useState("");
//   const { palette } = useTheme();
//   const { _id } = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//   const mediumMain = palette.neutral.mediumMain;
//   const medium = palette.neutral.medium;

//   const handlePlace = async () => {
//     const formData = new FormData();
//     formData.append("userId", _id);
//     formData.append("description", place);
//     if (image) {
//       formData.append("picture", image);
//       formData.append("picturePath", image.name);
//     }

//     const response = await fetch(`http://localhost:3001/places`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });
//     const places = await response.json();
//     dispatch(setPlaces({ places }));
//     setImage(null);
//     setPlace("");
//   };

//   return (
//     <WidgetWrapper>
//       <FlexBetween gap="1.5rem">
//         <UserImage image={picturePath} />
//         <InputBase
//           placeholder="Add a new place..."
//           onChange={(e) => setPlace(e.target.value)}
//           value={place}
//           sx={{
//             width: "100%",
//             backgroundColor: palette.neutral.light,
//             borderRadius: "2rem",
//             padding: "1rem 2rem",
//           }}
//         />
//       </FlexBetween>
//       {isImage && (
//         <Box
//           border={`1px solid ${medium}`}
//           borderRadius="5px"
//           mt="1rem"
//           p="1rem"
//         >
//           <Dropzone
//             acceptedFiles=".jpg,.jpeg,.png"
//             multiple={false}
//             onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
//           >
//             {({ getRootProps, getInputProps }) => (
//               <FlexBetween>
//                 <Box
//                   {...getRootProps()}
//                   border={`2px dashed ${palette.primary.main}`}
//                   p="1rem"
//                   width="100%"
//                   sx={{ "&:hover": { cursor: "pointer" } }}
//                 >
//                   <input {...getInputProps()} />
//                   {!image ? (
//                     <p>Add Image Here</p>
//                   ) : (
//                     <FlexBetween>
//                       <Typography>{image.name}</Typography>
//                       <EditOutlined />
//                     </FlexBetween>
//                   )}
//                 </Box>
//                 {image && (
//                   <IconButton
//                     onClick={() => setImage(null)}
//                     sx={{ width: "15%" }}
//                   >
//                     <DeleteOutlined />
//                   </IconButton>
//                 )}
//               </FlexBetween>
//             )}
//           </Dropzone>
//         </Box>
//       )}

//       <Divider sx={{ margin: "1.25rem 0" }} />

//       <FlexBetween>
//         <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
//           <ImageOutlined sx={{ color: mediumMain }} />
//           <Typography
//             color={mediumMain}
//             sx={{ "&:hover": { cursor: "pointer", color: medium } }}
//           >
//             Image
//           </Typography>
//         </FlexBetween>

//         {isNonMobileScreens ? (
//           <>
//             <FlexBetween gap="0.25rem">
//               <GifBoxOutlined sx={{ color: mediumMain }} />
//               <Typography color={mediumMain}>Clip</Typography>
//             </FlexBetween>

//             <FlexBetween gap="0.25rem">
//               <AttachFileOutlined sx={{ color: mediumMain }} />
//               <Typography color={mediumMain}>Attachment</Typography>
//             </FlexBetween>

//             <FlexBetween gap="0.25rem">
//               <MicOutlined sx={{ color: mediumMain }} />
//               <Typography color={mediumMain}>Audio</Typography>
//             </FlexBetween>
//           </>
//         ) : (
//           <FlexBetween gap="0.25rem">
//             <MoreHorizOutlined sx={{ color: mediumMain }} />
//           </FlexBetween>
//         )}

//         <Button
//           disabled={!place}
//           onClick={handlePlace}
//           sx={{
//             color: palette.background.alt,
//             backgroundColor: palette.primary.main,
//             borderRadius: "3rem",
//           }}
//         >
//           POST
//         </Button>
//       </FlexBetween>
//     </WidgetWrapper>
//   );
// };

// export default AddPlaceWidget;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { addPlace } from "state/placeSlice";

const AddPlaceWidget = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    category: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const placeData = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
        }
      };

      const response = await fetch("http://localhost:3001/places", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(placeData),
      });

      if (!response.ok) {
        throw new Error("Failed to create place");
      }

      const newPlace = await response.json();
      dispatch(addPlace(newPlace));
      
      // Reset form
      setFormData({
        name: "",
        address: "",
        description: "",
        category: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        fontWeight="500"
        color={palette.neutral.dark}
        sx={{ mb: 2 }}
      >
        Add New Place
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="1rem"
          gridTemplateColumns={isNonMobileScreens ? "repeat(2, 1fr)" : "1fr"}
        >
          <TextField
            required
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            label="Latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            onChange={handleChange}
            fullWidth
            inputProps={{ step: "any" }}
          />
          <TextField
            required
            label="Longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            onChange={handleChange}
            fullWidth
            inputProps={{ step: "any" }}
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ gridColumn: isNonMobileScreens ? "span 2" : "span 1" }}
          />
        </Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            mt: 2,
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          Add Place
        </Button>
      </form>
    </WidgetWrapper>
  );
};

export default AddPlaceWidget;