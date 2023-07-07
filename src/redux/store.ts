import { configureStore } from "@reduxjs/toolkit";
import mainGoalsReducer from "./features/mainGoalsSlice";
import userReducer from "./features/userSlice";
import treeTopReducer from "./features/treeTopSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainGoals: mainGoalsReducer,
    treeTop: treeTopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
