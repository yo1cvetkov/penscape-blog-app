import React from "react";

function FormInputError({ children }: { children: React.ReactNode }) {
  return <p className="text-xs mt-1 text-red-500">{children}</p>;
}

export default FormInputError;
