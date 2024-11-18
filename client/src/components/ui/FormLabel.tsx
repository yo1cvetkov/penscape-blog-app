import React from "react";
import { Label } from "@headlessui/react";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const FormLabel = React.forwardRef(function FormLabel({ children, required, ...props }: FormLabelProps, ref: React.Ref<HTMLLabelElement>) {
  return (
    <Label {...props} ref={ref} htmlFor={props.htmlFor} className="text-sm/6 font-medium">
      {children}
      {required ? <span className="text-slate-500">*</span> : null}
    </Label>
  );
});

FormLabel.displayName = "FormLabel";

export default FormLabel;
