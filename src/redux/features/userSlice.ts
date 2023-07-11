import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  name: string | null;
  id: string | null;
  provider: string | null;
  email: string | null;
  goals?: string[] | null;
};

const initialState: State = {
  name: null,
  id: null,
  provider: null,
  email: null,
  goals: null,
};

export const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<State>) => {
      return {
        name: action.payload.name,
        id: action.payload.id,
        goals: action.payload.goals,
        provider: action.payload.provider,
        email: action.payload.email,
      };
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
