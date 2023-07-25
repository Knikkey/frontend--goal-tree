import { createSlice } from "@reduxjs/toolkit";

type State = {
  snackIsOpen: boolean;
};

const initialState: State = {
  snackIsOpen: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    closeSnack: (state, action) => {
      return { snackIsOpen: false };
    },
    setSnackOpen: (state, action) => {
      return {
        snackIsOpen: true,
      };
    },
  },
});

export const { closeSnack, setSnackOpen } = snackbarSlice.actions;
export default snackbarSlice.reducer;
