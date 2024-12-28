import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
};

export const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload.places;
    },
    updatePlace: (state, action) => {
      const updatedPlace = action.payload;
      const index = state.places.findIndex((place) => place._id === updatedPlace._id);
      if (index !== -1) {
        state.places[index] = updatedPlace;
      }
    },
    deletePlace: (state, action) => {
      state.places = state.places.filter((place) => place._id !== action.payload);
    },
    addPlace: (state, action) => {
      state.places.push(action.payload);
    },
  },
});

export const { setPlaces, updatePlace, deletePlace, addPlace } = placeSlice.actions;
export default placeSlice.reducer;