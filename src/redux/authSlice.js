import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false },
  reducers: {
    isloggedIn: (state, action) => {
      return (state.isAuthenticated = action.payload);
    },
  },
});

export const { isloggedIn } = authSlice.actions;
export default authSlice.reducer;
