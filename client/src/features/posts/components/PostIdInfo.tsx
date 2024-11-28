import { format } from "date-fns";
import { Post } from "../types/Post";
import Separator from "../../../components/ui/Separator";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Link } from "react-router-dom";
import { ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, EyeIcon, HandThumbUpIcon, PencilSquareIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";

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
          <div className="flex items-center gap-x-2">
            <EyeIcon className="text-gray-500 size-5" />
            <span className="text-xs text-gray-500">{post.views}</span>
          </div>
          <Button className="flex items-center gap-x-2">
            <HandThumbUpIcon className="text-gray-500 size-5" />
            <span className="text-xs text-gray-500">{post.likes}</span>
          </Button>
          <div className="flex items-center gap-x-2">
            <ChatBubbleOvalLeftIcon className="text-gray-500 size-5" />
            <span className="text-xs text-gray-500">{post.comments}</span>
          </div>
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
