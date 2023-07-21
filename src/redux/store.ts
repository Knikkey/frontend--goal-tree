import { configureStore } from "@reduxjs/toolkit";
import mainGoalsReducer from "./features/mainGoalsSlice";
import userReducer from "./features/userSlice";
import modalSliceReducer from "./features/modalSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainGoals: mainGoalsReducer,
    modal: modalSliceReducer,
  },
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
