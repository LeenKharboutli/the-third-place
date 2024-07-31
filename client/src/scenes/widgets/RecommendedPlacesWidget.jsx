import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecommendedPlaces } from "state";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";

const RecommendedPlacesWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const recommendedPlaces = useSelector((state) => state.recommendedPlaces);

  const getRecommendedPlaces = async () => {
    const response = await fetch(
      "http://localhost:3001/places/recommended",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setRecommendedPlaces({ recommendedPlaces: data }));
  };

  useEffect(() => {
    getRecommendedPlaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Recommended Places
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(recommendedPlaces) && recommendedPlaces.length > 0 ? (
          recommendedPlaces.map((place) => (
            <FlexBetween key={place._id}>
              <Typography color={palette.neutral.main}>{place.name}</Typography>
              <Typography color={palette.neutral.medium} fontSize="0.75rem">
                {place.category}
              </Typography>
            </FlexBetween>
          ))
        ) : (
          <Typography color={palette.neutral.main}>No recommended places available.</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default RecommendedPlacesWidget;