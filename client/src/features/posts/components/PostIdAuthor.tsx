import React from "react";
import { useGetUserQuery } from "../../users/api/usersApiSlice";
import Skeleton from "../../../components/ui/Skeleton";
import { UserIcon } from "@heroicons/react/24/outline";
import { cn } from "../../../helpers/cn";

interface PostIdAuthorProps {
  createdAt: string;
  authorId: string;
}

function PostIdAuthor({ createdAt, authorId }: PostIdAuthorProps) {
  const { data, isLoading } = useGetUserQuery(authorId);

  if (isLoading) return <Skeleton />;

  return (
    <div className="flex items-center gap-x-2">
      <div className={cn("relative overflow-hidden rounded-full size-10 bg-zinc-200", !data?.profilePicture && "flex items-center justify-center")}>
        {data?.profilePicture ? (
          <img src={data?.profilePicture} className="object-cover w-full h-full" alt={`${data?.username}'s profile picture`} />
        ) : (
          <UserIcon className="text-gray-700 size-4" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-zinc-900">{data?.username}</span>
        <span className="text-xs text-gray-500">{data?.email}</span>
      </div>
    </div>
  );
}

export default PostIdAuthor;
