import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  recentSearch: {
    query: string;
    books: Book[];
  };
}

const initialState: State = {
  recentSearch: {
    query: "",
    books: [],
  },
};

export const counterSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setRecentSearch: (state, action: PayloadAction<State["recentSearch"]>) => {
      state.recentSearch = action.payload;
      return state;
    },
  },
});

export const { setRecentSearch } = counterSlice.actions;
export default counterSlice.reducer;
