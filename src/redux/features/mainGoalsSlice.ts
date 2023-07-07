import { createSlice } from "@reduxjs/toolkit";

type State = {
  value: {
    mainGoals: string[] | null;
  };
};

const initialState = {
  value: {
    mainGoals: null,
  },
} as State;

export const mainGoalsSlice = createSlice({
  name: "main goals",
  initialState,
  reducers: {
    setMainGoals: (state, action) => {
      return {
        value: {
          mainGoals: action.payload,
        },
      };
    },
  },
});

export default mainGoalsSlice.reducer;
