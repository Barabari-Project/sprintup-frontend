// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSliice";
import blogCarausalReducer from "./slices/blogsCarusalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogCarausal: blogCarausalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
