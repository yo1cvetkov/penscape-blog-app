import React from "react";
import { Input } from "@headlessui/react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasErrors?: boolean;
}

const FormInput = React.forwardRef(function FormInput({ hasErrors, ...props }: FormInputProps, ref: React.Ref<HTMLElement>) {
  return (
    <Input
      ref={ref}
      {...props}
      className={`mt-1 block w-full rounded-lg border ${
        hasErrors && "border-red-400"
      } py-1.5 px-3 text-sm/6 disabled:cursor-not-allowed disabled:opacity-50  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
    />
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
