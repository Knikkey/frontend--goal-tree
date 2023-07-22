import { createSlice } from "@reduxjs/toolkit";

type State = {
  modalIsOpen: boolean;
  mainGoalIsOpen: boolean;
  goalCardIsOpen: boolean;
};

const initialState: State = {
  modalIsOpen: false,
  mainGoalIsOpen: false,
  goalCardIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal slice",
  initialState,
  reducers: {
    closeModal: () => initialState,
    openMainGoals: (state) => {
      return { ...state, modalIsOpen: true, mainGoalIsOpen: true };
    },
    openGoalCard: (state) => {
      return { ...state, modalIsOpen: true, goalCardIsOpen: true };
    },
  },
});

export const { closeModal, openMainGoals, openGoalCard } = modalSlice.actions;
export default modalSlice.reducer;
