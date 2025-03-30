import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [], // Fix: Set initial state as an empty array

  reducers: {
    addRequests: (state, action) => {
      console.log("adding states", state);
      return action.payload;
    },

    removeRequest: (state, action) => {
      console.log("State before:", JSON.stringify(state, null, 2)); // Stringify the state for better inspection
      // const newState = [state];

      const updatedState = state?.data?.filter(
        (request) => request._id !== action.payload
      );
      return updatedState;
    },
  },
});
``;

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
