import { Button } from "@headlessui/react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { usePostLikeMutation } from "../../likes/api/likesApiSlice";
import toast from "react-hot-toast";

function LikeButton({ likes, postId }: { likes: number; postId: string }) {
  const [postLikeMutation] = usePostLikeMutation();

  const likePost = async () => {
    try {
      await postLikeMutation({ postId }).unwrap();

      toast.success("Post liked");
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  return (
    <Button onClick={likePost} className="flex items-center gap-x-2">
      <HandThumbUpIcon className="text-gray-500 size-5" />
      <span className="text-xs text-gray-500">{likes}</span>
    </Button>
  );
}

export default LikeButton;
