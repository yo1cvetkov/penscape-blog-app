import React, { SetStateAction, useState } from "react";
import CardWrapper from "../../../components/ui/CardWrapper";
import { Button, Field, Fieldset } from "@headlessui/react";
import FormLabel from "../../../components/ui/FormLabel";
import FormInput from "../../../components/ui/FormInput";
import ButtonComponent from "../../../components/ui/Button";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Spinner from "../../../components/ui/Spinner";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useUpdatePostMutation } from "../api/postsApiSlice";
import { useNavigate } from "react-router-dom";

interface AddTagsProps {
  id: string;
  tags: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
}

function AddTags({ id, tags, setTags }: AddTagsProps) {
  const [tagName, setTagName] = useState<string>("");

  const [updatePostMutation, { isLoading: isUpdatingPost }] = useUpdatePostMutation();

  const navigate = useNavigate();

  return (
    <div className="relative">
      <CardWrapper className="mx-auto mt-16 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Add tags</h1>
        <Fieldset>
          <Field>
            <FormLabel>Enter tag</FormLabel>
            <div className="flex items-center gap-x-2">
              <FormInput
                value={tagName}
                onChange={(event) => {
                  setTagName(event.target.value);
                }}
                className="w-full"
                placeholder="Enter tag name"
              />
              <ButtonComponent
                onClick={() => {
                  if (tagName.length > 0) {
                    setTags((prevTags) => [...prevTags, tagName]);
                    setTagName("");
                  } else {
                    toast.error("Tag name must not be empty.");
                  }
                }}
                className="flex items-center justify-center w-24"
              >
                Add tag
              </ButtonComponent>
            </div>
          </Field>
        </Fieldset>
        <div className="space-x-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1.5 text-sm/4 border inline-flex items-center gap-x-1 rounded-full">
              {tag}
              <Button
                onClick={() => {
                  setTags((prevTags) => prevTags.filter((t) => t !== tag));
                }}
              >
                <XMarkIcon className="size-4" />
              </Button>
            </span>
          ))}
        </div>
      </CardWrapper>
      <ButtonComponent
        disabled={isUpdatingPost}
        className="fixed flex items-center gap-4 px-6 py-3 text-base -translate-x-1/2 group hover:bg-zinc-800 bg-zinc-900 bottom-24 right-10"
        onClick={async () => {
          try {
            if (tags.length > 0) {
              await updatePostMutation({ id, tags }).unwrap();
              navigate(`/post/create/${id}/publish`, { viewTransition: true });
            } else {
              toast.error("Blocks are empty");
            }
          } catch (error) {
            toast.error("Post failed to update");
          }
        }}
      >
        {isUpdatingPost ? "Saving..." : "Save and continue"}
        {isUpdatingPost ? <Spinner /> : <ArrowRightIcon className="w-4 h-4 text-white transition duration-200 group-hover:translate-x-1" />}
      </ButtonComponent>
    </div>
  );
}

export default AddTags;
