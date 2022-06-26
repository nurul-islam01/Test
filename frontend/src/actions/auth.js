import { createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "./constans";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    authReducer: (state = {}, action) => {
      switch (action.type) {
        case LOGIN:
          return action.payload;
        default:
          return state;
      }
    },
  },
});

export const { authReducer } = authSlice.actions;

export default authSlice.reducer;
