import { createSlice } from "@reduxjs/toolkit";

type State = {
  mainGoalIsOpen: boolean;
};

const initialState: State = {
  mainGoalIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal slice",
  initialState,
  reducers: {
    closeModal: () => initialState,
    openMainGoals: (state) => {
      return { ...state, mainGoalIsOpen: true };
    },
  },
});

export const { closeModal, openMainGoals } = modalSlice.actions;
export default modalSlice.reducer;
