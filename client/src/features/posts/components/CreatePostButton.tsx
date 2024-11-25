import { PlusIcon } from "@heroicons/react/24/outline";
import { Link, matchPath, useLocation } from "react-router-dom";

function CreatePostButton() {
  const location = useLocation();

  const isMatch = matchPath("/post/create/*", location.pathname);

  if (isMatch) return null;

  return (
    <div className="group">
      <div className="fixed p-4 rounded-full bg-zinc-400 size-16 bottom-10 group-hover:animate-ping animate-once right-10"></div>
      <Link
        to={"/post/create"}
        viewTransition
        className={"fixed hover:bg-zinc-700 transition shadow-zinc-800/80 shadow-lg  bottom-10 bg-zinc-800 rounded-full p-4 right-10"}
      >
        <PlusIcon className="text-white size-8" />
      </Link>
    </div>
  );
}

export default CreatePostButton;
