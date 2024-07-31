import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  events: [],
  recommendedPlaces: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload.event);
    },
    updateEvent: (state, action) => {
      const updatedEvent = action.payload.event;
      const index = state.events.findIndex((event) => event._id === updatedEvent._id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event._id !== action.payload.eventId);
    },
    setRecommendedPlaces: (state, action) => {
      state.recommendedPlaces = action.payload.recommendedPlaces;
    },
    setProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload.profile };
      } else {
        console.error("user profile non-existent :(");
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setRecommendedPlaces,
  setProfile,
} = authSlice.actions;
export default authSlice.reducer;