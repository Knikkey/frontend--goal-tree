import { createSlice } from "@reduxjs/toolkit";

type State = {
  mainGoalsOpen: boolean;
};

const initialState: State = {
  mainGoalsOpen: true,
};

export const modalSlice = createSlice({
  name: "modal slice",
  initialState,
  reducers: {
    closeModal: () => initialState,
    openMainGoals: (state) => {
      state.mainGoalsOpen = true;
    },
  },
});

export const { closeModal, openMainGoals } = modalSlice.actions;
export default modalSlice.reducer;
