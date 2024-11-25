import React, { useState } from "react";
import { useGetPostQuery } from "../features/posts/api/postsApiSlice";
import { useParams } from "react-router-dom";
import PostEditor from "../features/posts/components/PostEditor";
import ButtonComponent from "../components/ui/Button";

function CreatePostIdPage() {
  const params = useParams();

  const [step, setStep] = useState<"1" | "2">("1");

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (step === "2") {
    return <div>Add tags and other data</div>;
  }

  return (
    <div>
      {data?.authorId}
      <ButtonComponent onClick={() => setStep("2")}>Save post</ButtonComponent>
      <PostEditor post={data!} />
    </div>
  );
}

export default CreatePostIdPage;
