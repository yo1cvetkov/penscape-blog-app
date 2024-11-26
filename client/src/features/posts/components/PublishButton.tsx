import React from "react";
import { usePublishPostMutation } from "../api/postsApiSlice";
import ButtonComponent from "../../../components/ui/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PublishButton({ id }: { id: string }) {
  const [publishPostMutation] = usePublishPostMutation();

  const navigate = useNavigate();

  return (
    <ButtonComponent
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
      PublishButton
    </ButtonComponent>
  );
}

export default PublishButton;
