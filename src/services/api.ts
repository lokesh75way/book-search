import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = `key=${process.env.REACT_APP_GOOGLE_BOOK_API_KEY}`;

type GetBooksResponse = {
  items?: Book[];
  kind: string;
  totalItems: number;
};

type GetBookPayload = { q: string; startIndex?: number };

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Books", "Book"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<GetBooksResponse, GetBookPayload>({
      query: ({ q, startIndex = 0 }) =>
        `/volumes?q=${q}&startIndex=${startIndex}&${key}`,
      providesTags: ["Books"],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/volumes/${id}?${key}`,
      providesTags: ["Book"],
    }),
  }),
});

export const { useLazyGetBooksQuery, useGetBookByIdQuery } = api;
