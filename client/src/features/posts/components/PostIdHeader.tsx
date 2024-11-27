import { Post } from "../types/Post";
import CategoryBadge from "../../categories/components/CategoryBadge";
import TagBadge from "./TagBadge";
import PostIdAuthor from "./PostIdAuthor";

interface PostIdHeaderProps {
  post: Post;
}

function PostIdHeader({ post }: PostIdHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-zinc-800">{post.title}</h1>
        <div className="flex items-center mt-2 gap-x-4">
          <CategoryBadge categoryId={post.categoryId} />
          <div className="flex items-center space-x-1">
            {post.tags?.map((tag, idx) => (
              <TagBadge key={idx}>{tag}</TagBadge>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-gray-500">Written by</span>
        <PostIdAuthor createdAt={post.createdAt!} authorId={post.authorId!} />
      </div>
    </header>
  );
}

export default PostIdHeader;
