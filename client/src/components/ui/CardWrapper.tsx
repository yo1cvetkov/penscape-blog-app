import React from "react";
import { cn } from "../../helpers/cn";

function CardWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full max-w-xl border-gray-600 border border-opacity-10 rounded-lg p-4", className)}>{children}</div>;
}

export default CardWrapper;
