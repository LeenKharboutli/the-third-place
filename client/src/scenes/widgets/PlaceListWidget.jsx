// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPlaces } from "state/placeSlice";
// import PlaceWidget from "./PlaceWidget";
// import { Box, CircularProgress } from "@mui/material";

// const PlaceListWidget = ({ userId }) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // Access the places array from the places slice
//   const places = useSelector((state) => state.places); //.places?
//   const token = useSelector((state) => state.token);

//   const getPlaces = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch("http://localhost:3001/places", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       dispatch(setPlaces({ places: data }));
//     } catch (err) {
//       console.error("Error fetching places:", err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getPlaces();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" p={2}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={2}>
//         <p>Error loading places: {error}</p>
//       </Box>
//     );
//   }

//   if (!places || places.length === 0) {
//     return (
//       <Box p={2}>
//         <p>No places found.</p>
//       </Box>
//     );
//   }

//   return (
//     <>
//       {places.map(({
//         _id,
//         name,
//         address,
//         description,
//         category,
//         picturePath,
//       }) => (
//         <PlaceWidget
//           key={_id}
//           placeId={_id}
//           placeName={name}
//           placeAddress={address}
//           description={description}
//           category={category}
//           picturePath={picturePath}
//         />
//       ))}
//     </>
//   );
// };

// export default PlaceListWidget;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaces } from "state";  // Import from your main state file
import PlaceWidget from "./PlaceWidget";
import { Box, CircularProgress } from "@mui/material";

const PlaceListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get places directly from auth state
  const places = useSelector((state) => state.places);
  const token = useSelector((state) => state.token);

  const getPlaces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/places", {
        method: "GET",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Places data received:", data);
      
      dispatch(setPlaces({ places: data }));
    } catch (err) {
      console.error("Error fetching places:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <p>Error loading places: {error}</p>
      </Box>
    );
  }

  if (!places || places.length === 0) {
    return (
      <Box p={2}>
        <p>No places found.</p>
      </Box>
    );
  }

  return (
    <>
      {places.map(({
        _id,
        name,
        address,
        description,
        category,
        picturePath,
        owner,
        isVerified
      }) => (
        <PlaceWidget
          key={_id}
          placeId={_id}
          placeName={name}
          placeAddress={address}
          description={description}
          category={category}
          picturePath={picturePath}
          owner={owner}
          isVerified={isVerified}
        />
      ))}
    </>
  );
};

export default PlaceListWidget;