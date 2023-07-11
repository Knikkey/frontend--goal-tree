import { createSlice } from "@reduxjs/toolkit";

type State = {
  mainGoals: string[] | null;
};

const initialState: State = {
  mainGoals: null,
};

export const mainGoalsSlice = createSlice({
  name: "main goals",
  initialState,
  reducers: {
    setMainGoals: (state, action) => {
      return {
        mainGoals: action.payload,
      };
    },
  },
});

export const { setMainGoals } = mainGoalsSlice.actions;
export default mainGoalsSlice.reducer;
