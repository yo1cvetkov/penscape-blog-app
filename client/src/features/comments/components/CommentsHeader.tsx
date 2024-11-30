import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

function CommentsHeader({ commentsCount }: { commentsCount: number }) {
  return (
    <div className="flex items-center gap-x-2">
      <ChatBubbleOvalLeftIcon className="text-gray-500 size-5" />
      <span className="text-xs text-gray-500">{commentsCount}</span>
    </div>
  );
}

export default CommentsHeader;
