import { createSlice } from "@reduxjs/toolkit";

type MainGoalsType = {
  id: string;
  title: string;
};

type GoalObj = {
  completed: boolean;
  createdAt: string;
  deadline: null | string;
  description: string;
  id: string;
  masterGoalId: null;
  ownerId: string;
  parentGoalId: null;
  title: string;
  updatedAt: string;
};

type State = {
  mainGoals: MainGoalsType[] | null;
  currMainGoalId: string | null;
  currentGoal: GoalObj | null;
};

const initialState: State = {
  mainGoals: null,
  currMainGoalId: null,
  currentGoal: null,
};

export const goalsSlice = createSlice({
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
    setCurrentGoal: (state, action) => {
      return {
        ...state,
        currentGoal: action.payload,
      };
    },
  },
});

export const { setMainGoals, setCurrMainGoal, setCurrentGoal } =
  goalsSlice.actions;
export default goalsSlice.reducer;
