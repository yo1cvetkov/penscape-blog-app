import { ArrowUpTrayIcon, CheckIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";
import { cn } from "../../../helpers/cn";
import { Button } from "@headlessui/react";
import { useUpdateAvatarMutation } from "../api/profileApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import axios from "axios";

function AvatarUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [avatar, setAvatar] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const [updateAvatarMutation, { isLoading }] = useUpdateAvatarMutation();

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

  const onUpdateAvatar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile || !user) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      // await updateAvatarMutation({ formData, id: user?._id }).unwrap();
      const url = await axios
        .patch(`http://localhost:3000/api/users/${user._id}/avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => res.data);

      setAvatar(url);

      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onUpdateAvatar}>
      <input ref={fileInputRef} hidden name="file" type="file" aria-hidden="true" onChange={onFileChange} />
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
      {selectedFile ? (
        <div className="flex items-center gap-x-2">
          <span className="text-sm">Save avatar?</span>
          <Button type="submit" className="p-1 transition duration-200 rounded-full hover:bg-emerald-50">
            <CheckIcon className="size-4 fill-emerald-400" />
          </Button>
        </div>
      ) : null}
      {avatar && (
        <div>
          <img src={avatar} />
        </div>
      )}
    </form>
  );
}

export default AvatarUpload;
