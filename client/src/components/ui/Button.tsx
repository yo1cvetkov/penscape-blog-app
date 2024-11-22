import { Button } from "@headlessui/react";
import React from "react";
import { cn } from "../../helpers/cn";

interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonComponent = React.forwardRef(function ButtonComponent({ children, className, ...props }: ButtonComponentProps, ref: React.Ref<HTMLButtonElement>) {
  return (
    <Button
      ref={ref}
      {...props}
      className={cn(
        "inline-flex transition-all justify-end gap-2 disabled:opacity-80 disabled:cursor-not-allowed  rounded-lg bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white",
        className
      )}
    >
      {children}
    </Button>
  );
});

export default ButtonComponent;
