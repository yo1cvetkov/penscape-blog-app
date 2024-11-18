import React from "react";

function CardWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-xl border-gray-600 border border-opacity-10 rounded-lg p-4">{children}</div>;
}

export default CardWrapper;
