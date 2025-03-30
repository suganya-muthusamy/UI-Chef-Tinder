import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      console.log("user added");
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    loggedIn: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUser, removeUser, loggedIn } = userSlice.actions;

export default userSlice.reducer;
