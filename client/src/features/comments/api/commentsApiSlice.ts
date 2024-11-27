import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { Comment } from "../types/Comment";
import { postsApiSlice } from "../../posts/api/postsApiSlice";
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
      postComment: builder.mutation<Comment, { content: string; postId: string }>({
        query: ({ content, postId }) => ({
          url: `/comments/${postId}`,
          method: "POST",
          body: {
            content,
          },
        }),
        async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;

            dispatch(postsApiSlice.util.invalidateTags([{ type: "Post", id: postId }]));
          } catch {}
        },
        invalidatesTags: (result, error, { postId }) => [{ type: "Comments", postId }],
      }),
    };
  },
});

export const { useGetPostCommentsQuery, usePostCommentMutation } = commentsApiSlice;
