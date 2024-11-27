import { useGetPostQuery } from "../features/posts/api/postsApiSlice";
import { useParams } from "react-router-dom";
import PostViewer from "../features/posts/components/PostViewer";
import PostIdHeader from "../features/posts/components/PostIdHeader";
import PostIdInfo from "../features/posts/components/PostIdInfo";

function PostIdPage() {
  const params = useParams();

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  if (isLoading) return <div>Loading...</div>;
  // const content = JSON.parse(data?.content);

  // console.log("parsed content", content);

  return (
    <section className="py-10">
      <PostIdHeader post={data!} />
      <PostIdInfo post={data!} />
      <PostViewer post={data!} />
    </section>
  );
}

export default PostIdPage;
