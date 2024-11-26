import { useState } from "react";
import { useParams } from "react-router-dom";
import Separator from "../components/ui/Separator";
import { useGetPostQuery } from "../features/posts/api/postsApiSlice";
import AddTags from "../features/posts/components/AddTags";
import PostEditor from "../features/posts/components/PostEditor";

function CreatePostIdPage() {
  const params = useParams();

  const [step, setStep] = useState<"1" | "2">("1");

  const [tags, setTags] = useState<string[]>([]);

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (step === "2") {
    return <AddTags id={params.id as string} setTags={setTags} tags={tags} />;
  }

  return (
    <div className="relative pt-10">
      <h1 className="text-4xl font-bold text-zinc-900">Enter post content</h1>
      <p className="mt-2 text-zinc-700">Enter desired post content below and proceed.</p>
      <Separator />
      <PostEditor post={data!} setStep={setStep} />
    </div>
  );
}

export default CreatePostIdPage;
