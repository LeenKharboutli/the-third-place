// source of the authReducer that's being imported in the index.js


// NOTES:
// Reducers and action creators are fundamental concepts in Redux and state management in general
// Action Creators: create action objects that describe what happened in the app
// Reducers: specify how the application's state changes in response to actions

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  events: [],
  recommendedPlaces: [],
};

// createSlice takes an object with name, initialState, and reducers.
// createSlice automatically:
// Generates action creators for each reducer function
// Combines all these case reducers into a single reducer function
// Combined reducer function is available as a property on the slice object: authSlice.reducer
export const authSlice = createSlice({
  name: "auth",
  initialState,
  // each key below defines a case reducer function for a specific action
  // In the context of the code using Redux Toolkit's createSlice, setLogin is actually both an action creator and a reducer case
  // Redux Toolkit automatically generates an action creator function with the same name
  // That's why we see export const { setLogin } = authSlice.actions;
  // When you use setLogin in your component to dispatch an action, you're using it as an action creator. When Redux processes this action, it uses the setLogin reducer case to update the state.
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

//export individual action creators
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

// authReducer
export default authSlice.reducer;