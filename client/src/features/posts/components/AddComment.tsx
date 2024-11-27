import { Field, Fieldset } from "@headlessui/react";
import FormTextarea from "../../../components/ui/FormTextarea";
import ButtonComponent from "../../../components/ui/Button";
import { usePostCommentMutation } from "../../comments/api/commentsApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";

function AddComment({ postId }: { postId: string }) {
  const [postCommentMutation, { isLoading }] = usePostCommentMutation();

  const [content, setContent] = useState("");

  const onSubmit = async () => {
    try {
      await postCommentMutation({ content, postId }).unwrap();

      toast.success("Comment added successfully");

      setContent("");
    } catch (error) {
      toast.error("Failed to create comment");
    }
  };

  return (
    <div className="pt-10">
      <Fieldset>
        <Field>
          <FormTextarea value={content} onChange={(event) => setContent(event.target.value)} cols={20} placeholder="Write your comment..." />
        </Field>
        <div className="flex justify-end mt-4">
          <ButtonComponent onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Posting..." : "Post comment"}
          </ButtonComponent>
        </div>
      </Fieldset>
    </div>
  );
}

export default AddComment;
