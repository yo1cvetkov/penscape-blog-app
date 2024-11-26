import React from "react";
import { usePublishPostMutation } from "../api/postsApiSlice";
import ButtonComponent from "../../../components/ui/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

function PublishButton({ id }: { id: string }) {
  const [publishPostMutation] = usePublishPostMutation();

  const navigate = useNavigate();

  return (
    <div className="relative group">
      <div className="fixed flex items-center gap-2 px-6 py-3 text-green-200 bg-green-200 rounded-xl bottom-24 group-hover:animate-ping animate-once right-10">
        <CheckIcon className="size-5" />
        Publish
      </div>
      <Button
        className="fixed flex items-center gap-2 px-6 py-3 text-base font-bold text-white transition bg-green-600 rounded-lg shadow-lg hover:bg-green-800 bottom-24 right-10"
        onClick={async () => {
          try {
            await publishPostMutation({ id }).unwrap();

            toast.success("Post published");

            navigate(`/post/${id}`, { viewTransition: true });
          } catch (error) {
            console.log(error);
            toast.error("Failed to publish");
          }
        }}
      >
        <CheckIcon className="size-5" />
        Publish
      </Button>
    </div>
  );
}

export default PublishButton;
