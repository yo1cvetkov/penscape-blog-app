import { Field, Fieldset } from "@headlessui/react";
import FormTextarea from "../../../components/ui/FormTextarea";
import ButtonComponent from "../../../components/ui/Button";

function AddComment() {
  return (
    <div className="pt-10">
      <Fieldset>
        <Field>
          <FormTextarea cols={20} placeholder="Write your comment..." />
        </Field>
        <div className="flex justify-end mt-4">
          <ButtonComponent>Post comment</ButtonComponent>
        </div>
      </Fieldset>
    </div>
  );
}

export default AddComment;
