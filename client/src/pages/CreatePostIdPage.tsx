import React, { useState } from "react";
import { useGetPostQuery } from "../features/posts/api/postsApiSlice";
import { useParams } from "react-router-dom";
import PostEditor from "../features/posts/components/PostEditor";
import ButtonComponent from "../components/ui/Button";
import CardWrapper from "../components/ui/CardWrapper";
import { Button, Field, Fieldset } from "@headlessui/react";
import FormLabel from "../components/ui/FormLabel";
import FormInput from "../components/ui/FormInput";
import { XMarkIcon } from "@heroicons/react/20/solid";

function CreatePostIdPage() {
  const params = useParams();

  const [step, setStep] = useState<"1" | "2">("1");

  const [tags, setTags] = useState<string[]>([]);

  const [tagName, setTagName] = useState<string>("");

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (step === "2") {
    return (
      <CardWrapper className="mx-auto mt-16 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Add tags</h1>
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
                  setTags((prevTags) => [...prevTags, tagName]);
                  setTagName("");
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
    );
  }

  return (
    <div className="relative">
      <PostEditor post={data!} setStep={setStep} />
    </div>
  );
}

export default CreatePostIdPage;
