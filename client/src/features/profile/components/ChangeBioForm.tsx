import FormTextarea from "../../../components/ui/FormTextarea";
import Button from "../../../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changeBioSchema, ChangeBioSchema } from "../schemas/changeBio.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputError from "../../../components/ui/FormInputError";

function ChangeBioForm() {
  const user = useSelector((state: RootState) => state.auth.user);
  const form = useForm<ChangeBioSchema>({
    resolver: zodResolver(changeBioSchema),
    defaultValues: {
      bio: user?.bio,
    },
  });

  const onSubmit: SubmitHandler<ChangeBioSchema> = (data) => {
    console.log(data);
  };

  return (
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller control={form.control} name="bio" render={({ field }) => <FormTextarea {...field} disabled={form.formState.isSubmitting} />} />
      <FormInputError>{form.formState.errors.bio?.message}</FormInputError>
      <div className="flex justify-end mt-4">
        <Button type="submit">Update bio</Button>
      </div>
    </form>
  );
}

export default ChangeBioForm;
