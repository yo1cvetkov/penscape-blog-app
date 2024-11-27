import { useGetCategoryQuery } from "../api/categoryApiSlice";
import Skeleton from "../../../components/ui/Skeleton";

interface CategoryBadgeProps {
  categoryId: string;
}

function CategoryBadge({ categoryId }: CategoryBadgeProps) {
  const { data, isLoading } = useGetCategoryQuery({ id: categoryId });

  if (isLoading)
    return (
      <div className="w-20">
        <Skeleton className="h-6 rounded-full" />
      </div>
    );

  return <span className="px-3 py-1.5 font-bold rounded-full text-sm text-white bg-blue-400">{data?.name}</span>;
}

export default CategoryBadge;
