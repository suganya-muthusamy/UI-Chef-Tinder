import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: JSON.parse(localStorage.getItem("connections")) || [],
  reducers: {
    addConnection: (state, action) => {
      const updatedState = action.payload;
      localStorage.setItem("connections", JSON.stringify(updatedState)); // Persist to localStorage
      return updatedState;
    },
    removeConnection: (state, action) => [],
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
