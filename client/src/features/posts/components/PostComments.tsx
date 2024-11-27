import Separator from "../../../components/ui/Separator";
import { useGetPostCommentsQuery } from "../../comments/api/commentsApiSlice";
import AddComment from "./AddComment";
import PostComment from "./PostComment";

interface PostCommentsProps {
  postId: string;
}

function PostComments({ postId }: PostCommentsProps) {
  const { data, isLoading } = useGetPostCommentsQuery(postId);

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-bold text-zinc-900">Comments</h2>
      <Separator />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8 space-y-4">{data?.length ? data.map((comment) => <PostComment comment={comment} />) : <p>No comments for this post</p>}</div>
      )}
      <AddComment postId={postId} />
    </section>
  );
}

export default PostComments;
