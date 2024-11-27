import React from "react";
import { cn } from "../../../helpers/cn";

interface TagBadgeProps {
  children: React.ReactNode;
  className?: string;
}

function TagBadge({ children, className }: TagBadgeProps) {
  return <span className={cn("bg-gray-200 text-gray-700 font-semibold text-sm py-1 px-3 rounded-full", className)}>#{children}</span>;
}

export default TagBadge;
