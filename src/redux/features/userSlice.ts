import { createSlice } from "@reduxjs/toolkit";

type State = {
  value: {
    username: string | null;
    uid: string | null;
    goals: string[] | null;
  };
};

const initialState = {
  value: {
    username: null,
    uid: null,
    goals: null,
  },
} as State;

export const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => {
      return {
        value: {
          username: action.payload.name,
          uid: action.payload.id,
          goals: action.payload.goals,
        },
      };
    },
  },
});

export default userSlice.reducer;
