import { useGetPostQuery, useIncrementViewsMutation } from "../features/posts/api/postsApiSlice";
import { useParams } from "react-router-dom";
import PostViewer from "../features/posts/components/PostViewer";
import PostIdHeader from "../features/posts/components/PostIdHeader";
import PostIdInfo from "../features/posts/components/PostIdInfo";
import { useEffect } from "react";
import PostComments from "../features/posts/components/PostComments";

function PostIdPage() {
  const params = useParams();

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  const [incrementViewsMutation] = useIncrementViewsMutation();

  useEffect(() => {
    async function incrementViews() {
      try {
        await incrementViewsMutation(params.id as string);
      } catch (error) {
        console.log(error);
      }
    }

    incrementViews();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-10">
      <PostIdHeader post={data!} />
      <PostIdInfo post={data!} />
      <PostViewer post={data!} />
      <PostComments postId={data?._id!} />
    </section>
  );
}

export default PostIdPage;
