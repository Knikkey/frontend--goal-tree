import { createSlice } from "@reduxjs/toolkit";

type GoalsType = {
  id: string;
  title: string;
};

type State = {
  mainGoals: GoalsType[] | null;
  currMainGoalId: string | null;
};

const initialState: State = {
  mainGoals: null,
  currMainGoalId: null,
};

export const mainGoalsSlice = createSlice({
  name: "main goals",
  initialState,
  reducers: {
    setMainGoals: (state, action) => {
      return {
        ...state,
        mainGoals: action.payload,
      };
    },
    setCurrMainGoal: (state, action) => {
      return {
        ...state,
        currMainGoalId: action.payload,
      };
    },
  },
});

export const { setMainGoals, setCurrMainGoal } = mainGoalsSlice.actions;
export default mainGoalsSlice.reducer;
