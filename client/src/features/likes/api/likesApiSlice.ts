import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { Like } from "../types/Like";
import { postsApiSlice } from "../../posts/api/postsApiSlice";

export const likeApiSlice = createApi({
  reducerPath: "likesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Likes"],
  endpoints: (builder) => {
    return {
      postLike: builder.mutation<Like, { postId: string }>({
        query: ({ postId }) => ({
          url: `/likes/${postId}`,
          method: "POST",
        }),
        async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;

            dispatch(postsApiSlice.util.invalidateTags([{ type: "Post", id: postId }]));
          } catch {}
        },
      }),
    };
  },
});

export const { usePostLikeMutation } = likeApiSlice;
