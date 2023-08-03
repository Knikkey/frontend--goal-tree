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
      // `https://goal-tree-by-knikkey-backend.onrender.com/dashboard/build-tree/${currMainGoalId}`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/build-tree/${currMainGoalId}`,
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

export const getMainGoals = createAsyncThunk(
  "goals/getMainGoals",
  async (id: string) => {
    const res = await fetch(
      // `https://goal-tree-by-knikkey-backend.onrender.com/dashboard/main-goals/${id}`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/main-goals/${id}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    const arr = data.map((goal) => {
      return { id: goal.id, title: goal.title };
    });
    return arr;
  }
);

export const goalsSlice = createSlice({
  name: "main goals",
  initialState,
  reducers: {
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
    builder.addCase(getMainGoals.pending, (state) => {
      state.pending = true;
      state.error = null;
    });
    builder.addCase(getMainGoals.fulfilled, (state, action) => {
      state.pending = false;
      state.mainGoals = action.payload;
    });
    builder.addCase(getMainGoals.rejected, (state, action) => {
      state.pending = false;
      state.error = "An error occured";
    });
  },
});

export const { setCurrMainGoal, setCurrentGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
