import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  ownerId: string;
  parentGoalId: null;
  title: string;
  updatedAt: string;
};

type State = {
  mainGoals: MainGoalsType[] | null;
  currMainGoalId: string | null;
  currentGoal: GoalObj | null;
  tree: any;
  pending: boolean;
  error: any;
};

const initialState: State = {
  mainGoals: null,
  currMainGoalId: null,
  currentGoal: null,
  tree: null,
  pending: false,
  error: null,
};

export const buildTree = createAsyncThunk(
  "goals/buildTree",
  async (currMainGoalId: string | null) => {
    if (currMainGoalId === null) return null;
    const res = await fetch(
      `http://localhost:5000/dashboard/build-tree/${currMainGoalId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(buildTree.pending, (state) => {
      state.pending = true;
      state.error = null;
    });
    builder.addCase(buildTree.fulfilled, (state, action) => {
      state.pending = false;
      state.tree = action.payload;
    });
    builder.addCase(buildTree.rejected, (state, action) => {
      state.pending = false;
      state.error = "An error occured";
    });
  },
});

export const { setMainGoals, setCurrMainGoal, setCurrentGoal } =
  goalsSlice.actions;
export default goalsSlice.reducer;
