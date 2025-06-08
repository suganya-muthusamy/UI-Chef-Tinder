import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")) || [],
  reducers: {
    addUser: (state, action) => {
      console.log("user added");
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(null));
      return null;
    },
    loggedIn: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUser, removeUser, loggedIn } = userSlice.actions;

export default userSlice.reducer;
