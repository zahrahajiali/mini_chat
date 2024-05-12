import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://spotify23.p.rapidapi.com",
});

export const SearchApi = createApi({
  reducerPath: "LoginsApi",
  baseQuery: customBaseQuery,
  //   tagTypes: ["songs"],
  endpoints: (builder) => ({
    searchSongs: builder.query({
      query: () => ({ url: "search", method: "GET" }),
      //   providesTags: ["songs"],
    }),
  }),
});
export const { useSearchSongsQuery } = SearchApi;
