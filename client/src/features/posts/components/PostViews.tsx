import { EyeIcon } from "@heroicons/react/24/outline";

function PostViews({ views }: { views: number }) {
  return (
    <div className="flex items-center gap-x-2">
      <EyeIcon className="text-gray-500 size-5" />
      <span className="text-xs text-gray-500">{views}</span>
    </div>
  );
}

export default PostViews;
