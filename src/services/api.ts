import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://my-json-server.typicode.com/dmitrijt9/book-api-mock",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], null>({
      query: () => "/books",
    }),
    getBookById: builder.query<Book[], number>({
      query: () => "/books",
    }),
    getAuthors: builder.query<Author[], null>({
      query: () => "/authors",
    }),
  }),
});

export const { useLazyGetBooksQuery, useGetBookByIdQuery, useGetAuthorsQuery } =
  api;
