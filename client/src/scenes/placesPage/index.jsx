import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PlaceListWidget from "scenes/widgets/PlaceListWidget";
import AddPlaceWidget from "scenes/widgets/AddPlaceWidget";

const PlacesPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <h1>(under construction)</h1> */}
          <PlaceListWidget userId={_id} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <AddPlaceWidget picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};

export default PlacesPage;