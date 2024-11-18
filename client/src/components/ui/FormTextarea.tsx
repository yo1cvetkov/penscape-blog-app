import { Textarea } from "@headlessui/react";
import React from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FormTextarea = React.forwardRef(function FormTextarea(props: FormTextareaProps, ref: React.Ref<HTMLElement>) {
  return (
    <Textarea
      ref={ref}
      {...props}
      className={
        "mt-1 block w-full border resize-none rounded-lg py-1.5 px-3 text-sm/6  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      }
      rows={5}
    />
  );
});

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
