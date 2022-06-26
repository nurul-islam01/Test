import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../actions/auth";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
