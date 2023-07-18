import { createSlice } from "@reduxjs/toolkit";
import { GoodPageCache } from "next/dist/client/page-loader";

type GoalsType = {
  id: string;
  title: string;
};

type State = {
  mainGoals: GoalsType[] | null;
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
