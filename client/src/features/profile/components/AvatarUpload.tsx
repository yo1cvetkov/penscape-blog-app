import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";
import { cn } from "../../../helpers/cn";

function AvatarUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input ref={fileInputRef} hidden type="file" aria-hidden="true" onChange={onFileChange} />
      <button
        className={cn(
          "relative block overflow-hidden bg-gray-200 border border-gray-400 rounded-full cursor-pointer size-20 group",
          preview ? "border-none" : "border-dashed"
        )}
        onClick={onUpload}
      >
        {preview ? (
          <img src={preview} className="absolute inset-0 object-cover w-full h-full overflow-hidden" />
        ) : (
          <div className="absolute flex flex-col items-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <ArrowUpTrayIcon className="transition-all duration-200 size-4 fill-gray-500 group-hover:-translate-y-2" />
            <span className="absolute mt-3 text-xs text-gray-500 transition duration-200 -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:block group-hover:opacity-100">
              Upload
            </span>
          </div>
        )}
      </button>
    </>
  );
}

export default AvatarUpload;
