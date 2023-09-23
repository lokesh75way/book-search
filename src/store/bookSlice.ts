import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

interface State {
  books: Record<number, Book>;
  authors: Record<number, Author>;
}

const initialState: State = {
  books: {},
  authors: {},
};

export const counterSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAuthors.matchFulfilled,
      (state, { payload }) => {
        const authors: Record<number, Author> = {};
        payload.forEach((author) => {
          authors[author.id] = author;
        });
        state.authors = authors;
        return state;
      }
    );
    builder.addMatcher(
      api.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        const books: Record<number, Book> = {};
        payload.forEach((book) => {
          books[book.id] = book;
        });
        state.books = books;
        return state;
      }
    );
  },
});

export default counterSlice.reducer;
