import { useGetPostCommentsQuery } from "../../comments/api/commentsApiSlice";
import AddComment from "./AddComment";

interface PostCommentsProps {
  postId: string;
}

function PostComments({ postId }: PostCommentsProps) {
  const { data, isLoading } = useGetPostCommentsQuery(postId);

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-bold text-zinc-900">Comments</h2>
      <AddComment />

      {isLoading ? <div>Loading...</div> : <div>{data?.length ? data.map((comment) => <div>{comment.content}</div>) : <p>No comments for this post</p>}</div>}
    </section>
  );
}

export default PostComments;
