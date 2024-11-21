import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";

export const postsApiSlice = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      getPosts: builder.query<void, void>({
        query: () => ({
          url: "/posts",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useGetPostsQuery } = postsApiSlice;
