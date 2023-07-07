import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const mainGoalsSlice = createSlice({
  name: "main goals",
  initialState,
  reducers: {},
});

export default mainGoalsSlice.reducer;
