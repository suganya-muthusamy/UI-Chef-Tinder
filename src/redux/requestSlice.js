import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: JSON.parse(localStorage.getItem("requests")) || [], // Fix: Set initial state as an empty array

  reducers: {
    addRequests: (state, action) => {
      const updatedState = action.payload;
      localStorage.setItem("requests", JSON.stringify(updatedState)); // Persist to localStorage
      return updatedState; // Update state with the new requests
    },

    removeRequest: (state, action) => {
      console.log("removing states", state);
      return state.filter((request) => request._id !== action.payload);
    },
  },
});
``;

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
