import { configureStore } from "@reduxjs/toolkit";
import mainGoalsReducer from "./features/mainGoalsSlice";

export const store = configureStore({
  reducer: {
    mainGoals: mainGoalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
