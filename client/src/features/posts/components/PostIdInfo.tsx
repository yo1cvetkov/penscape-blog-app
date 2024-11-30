import { Button } from "@headlessui/react";
import { ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, EyeIcon, PencilSquareIcon, ShareIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Separator from "../../../components/ui/Separator";
import { RootState } from "../../../store";
import { Post } from "../types/Post";
import LikeButton from "./LikeButton";
import PostViews from "./PostViews";
import CommentsHeader from "../../comments/components/CommentsHeader";

interface PostIdInfoProps {
  post: Post;
}

function PostIdInfo({ post }: PostIdInfoProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const isCurrentUserAuthor = () => {
    return user?._id === post.authorId;
  };

  return (
    <div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <PostViews views={post.views} />
          <LikeButton postId={post._id} likes={post.likes} />
          <CommentsHeader commentsCount={post.comments} />
          <span className="text-gray-500 ">·</span>
          <span className="text-sm text-gray-500">
            Last updated at <span className="font-semibold text-zinc-800">{format(new Date(post.updatedAt as string), "dd MMM yyyy")}</span>
          </span>

          <span className="text-gray-500 ">·</span>
          <span className="text-sm text-gray-500">
            Written on <span className="font-semibold text-zinc-800">{format(new Date(post.createdAt as string), "dd MMM yyyy")}</span>
          </span>
        </div>
        <div className="flex items-center gap-x-4">
          {isCurrentUserAuthor() ? (
            <div className="flex items-center gap-x-4">
              <Link
                to={`/post/create/${post._id}`}
                viewTransition
                className="inline-flex hover:bg-zinc-100/50 transition duration-200 text-sm text-zinc-600 px-3 py-1.5 items-center border gap-x-2 border-zinc-500/30 rounded-lg"
              >
                <PencilSquareIcon className="size-5 text-zinc-600" />
                Edit post
              </Link>
              <div>
                <EllipsisHorizontalIcon className="size-6 text-zinc-600" />
              </div>
            </div>
          ) : null}
          {!isCurrentUserAuthor() && (
            <Button>
              <ShareIcon className="text-gray-500 size-4" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
}

export default PostIdInfo;
