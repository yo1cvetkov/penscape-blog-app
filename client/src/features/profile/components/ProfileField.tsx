import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import FormInput from "../../../components/ui/FormInput";

interface ProfileFieldProps {
  label: string;
  children: React.ReactNode;
  defaultValue: string;
  dialogTitle: string;
  dialogParagraph: string;
}

function ProfileField({ label, children, defaultValue, dialogTitle, dialogParagraph }: ProfileFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-5 mt-6">
      <span className="text-base font-medium">{label}</span>
      <button onClick={() => setIsOpen(true)} className="flex items-center text-gray-500 transition duration-200 gap-x-2 group hover:text-gray-900">
        <span>{defaultValue}</span>
        <ArrowUpRightIcon className="size-3" />
      </button>
      <Dialog open={isOpen} as="div" className={"relative z-10 focus:outline-none"} onClose={() => setIsOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-lg bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className={"text-base/7 font-medium text-gray-800"}>
                {dialogTitle}
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-400">{dialogParagraph}</p>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ProfileField;
