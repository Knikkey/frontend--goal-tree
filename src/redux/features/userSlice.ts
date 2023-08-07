import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  name: string | null;
  id: string | null;
  provider: string | null;
  email: string | null;
};

const initialState: State = {
  name: null,
  id: null,
  provider: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<State>) => {
      return {
        name: action.payload.name,
        id: action.payload.id,
        provider: action.payload.provider,
        email: action.payload.email,
      };
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
