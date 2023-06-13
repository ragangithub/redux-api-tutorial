import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
