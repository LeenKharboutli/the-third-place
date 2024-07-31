import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
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
  },
});

export const { setEvents, addEvent, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;