import { createSlice } from "@reduxjs/toolkit";

type State = {
  modalIsOpen: boolean;
};

const initialState: State = {
  modalIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal slice",
  initialState,
  reducers: {
    closeModal: () => initialState,
    openModal: (state) => {
      return { ...state, modalIsOpen: true };
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
