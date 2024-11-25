import React from "react";
import { useGetPostQuery } from "../features/posts/api/postsApiSlice";
import { useParams } from "react-router-dom";
import PostViewer from "../features/posts/components/PostViewer";

function PostIdPage() {
  const params = useParams();

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  if (isLoading) return <div>Loading...</div>;
  // const content = JSON.parse(data?.content);

  // console.log("parsed content", content);

  return <PostViewer post={data!} />;
}

export default PostIdPage;
