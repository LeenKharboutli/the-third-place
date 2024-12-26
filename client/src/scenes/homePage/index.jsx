import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import CreateEventWidget from "scenes/widgets/CreateEventWidget";
import EventsWidget from "scenes/widgets/EventsWidget";
import RecommendedPlacesWidget from "scenes/widgets/RecommendedPlacesWidget";
import JoinedEventsWidget from "scenes/widgets/JoinedEventsWidget";

const HomePage = () => {
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
          <MyPostWidget picturePath={picturePath} />
          <CreateEventWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
          <EventsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <JoinedEventsWidget userId={_id} />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
            <Box m="2rem 0" />
            <RecommendedPlacesWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
