import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

interface State {
  books: Record<string, Book>;
  recentSearch: {
    query: string;
    books: Book[];
  };
}

const initialState: State = {
  books: {},
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
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        const books: Record<string, Book> = {};
        payload?.items?.forEach((book) => {
          books[book.id] = book;
        });
        state.books = books;
        return state;
      }
    );
  },
});

export const { setRecentSearch } = counterSlice.actions;
export default counterSlice.reducer;
