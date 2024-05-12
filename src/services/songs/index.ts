import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://genius-song-lyrics1.p.rapidapi.com",
});

export const SongsApi = createApi({
  reducerPath: "LoginsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["songs"],
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: () => ({ url: "search", method: "GET" }),
      providesTags: ["songs"],
    }),
    // login: builder.mutation({
    //   query: (body) => ({
    //     url: "login",
    //     method: "POST",
    //     body: body,
    //   }),
    // }),
  }),
});
export const { useGetAllSongsQuery } = SongsApi;
