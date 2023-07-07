import { createSlice } from "@reduxjs/toolkit";

type State = {
  value: {
    treeTop: string | null;
  };
};

const initialState: State = {
  value: {
    treeTop: null,
  },
};

export const mainGoalsSlice = createSlice({
  name: "main goals",
  initialState,
  reducers: {
    setTreeTop: (state, action) => {
      return {
        value: {
          treeTop: action.payload,
        },
      };
    },
  },
});

export default mainGoalsSlice.reducer;
