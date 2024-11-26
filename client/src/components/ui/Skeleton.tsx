import BaseSkeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

function Skeleton({ count = 1, className }: { count?: number; className?: string }) {
  return <BaseSkeleton className={className} count={count} />;
}

export default Skeleton;
