import React from "react";
import { useGetCategoryQuery } from "../api/categoryApiSlice";

interface CategoryBadgeProps {
  categoryId: string;
}

function CategoryBadge({ categoryId }: CategoryBadgeProps) {
  const { data, isLoading } = useGetCategoryQuery({ id: categoryId });

  if (isLoading) return <div>Loading...</div>;

  return <div>{data?.name}</div>;
}

export default CategoryBadge;
