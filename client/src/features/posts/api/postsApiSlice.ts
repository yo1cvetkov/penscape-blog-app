import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { Post } from "../types/Post";

interface DraftPostParams {
  title: string;
  categoryId: string;
}

export const postsApiSlice = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "Posts"],
  endpoints: (builder) => {
    return {
      getPosts: builder.query<void, void>({
        query: () => ({
          url: "/posts",
          method: "GET",
        }),
        providesTags: ["Posts"],
      }),
      createDraftPost: builder.mutation<Post, DraftPostParams>({
        query: (draftPostData) => ({
          url: "/posts/draft",
          method: "POST",
          body: draftPostData,
        }),
      }),
      getPost: builder.query<Post, { id: string }>({
        query: ({ id }) => ({
          url: `/posts/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, { id }) => [{ type: "Post", id }],
      }),
      updatePost: builder.mutation<Post, { id: string; content?: any; tags?: string[] }>({
        query: (updateData) => ({
          url: `/posts/${updateData.id}`,
          method: "PATCH",
          body: { content: updateData.content, tags: updateData.tags },
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
      }),
      publishPost: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `/posts/${id}/publish`,
          method: "PATCH",
        }),
      }),
    };
  },
});

export const { useGetPostsQuery, useCreateDraftPostMutation, useGetPostQuery, useUpdatePostMutation, usePublishPostMutation } = postsApiSlice;
