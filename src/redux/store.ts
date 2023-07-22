import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "./features/goalsSlice";
import userReducer from "./features/userSlice";
import modalSliceReducer from "./features/modalSlice";
import snackbarSliceReducer from "./features/snackbarSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    goals: goalsReducer,
    modal: modalSliceReducer,
    snackbar: snackbarSliceReducer,
  },
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
