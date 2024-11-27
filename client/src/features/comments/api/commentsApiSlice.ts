import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { Comment } from "../types/Comment";
export const commentsApiSlice = createApi({
  reducerPath: "commentsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Comments"],
  endpoints: (builder) => {
    return {
      getPostComments: builder.query<Comment[], string>({
        query: (postId) => ({
          url: `/comments/${postId}`,
          method: "GET",
        }),
        providesTags: (result, error, postId) => [{ type: "Comments", postId }],
      }),
    };
  },
});

export const { useGetPostCommentsQuery } = commentsApiSlice;
