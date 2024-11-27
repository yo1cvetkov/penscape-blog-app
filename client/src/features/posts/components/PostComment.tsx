import React from "react";
import { Comment } from "../../comments/types/Comment";
import { format } from "date-fns";

interface PostCommentProps {
  comment: Comment;
}

function PostComment({ comment }: PostCommentProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-2">
        <span className="text-lg font-bold text-zinc-900">{comment.authorId.username}</span>
        <span className="text-sm text-zinc-400">{format(new Date(comment.createdAt), "dd MMM yyyy")}</span>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}

export default PostComment;
