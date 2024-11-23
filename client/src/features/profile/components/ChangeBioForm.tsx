import FormTextarea from "../../../components/ui/FormTextarea";
import Button from "../../../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changeBioSchema, ChangeBioSchema } from "../schemas/changeBio.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputError from "../../../components/ui/FormInputError";
import { useUpdateUserInfoMutation } from "../api/profileApiSlice";
import { useClose } from "@headlessui/react";
import toast from "react-hot-toast";

function ChangeBioForm() {
  const user = useSelector((state: RootState) => state.auth.user);
  const form = useForm<ChangeBioSchema>({
    resolver: zodResolver(changeBioSchema),
    defaultValues: {
      bio: user?.bio,
    },
  });

  const [udpateUserInfoMutation, { isLoading }] = useUpdateUserInfoMutation();

  let close = useClose();

  const onSubmit: SubmitHandler<ChangeBioSchema> = async (data) => {
    try {
      await udpateUserInfoMutation({ bio: data.bio }).unwrap();

      close();

      toast.success("User bio updated successfully");
    } catch (error) {
      toast.error("Failed to update bio.");
    }
  };

  return (
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller control={form.control} name="bio" render={({ field }) => <FormTextarea {...field} disabled={form.formState.isSubmitting} />} />
      <FormInputError>{form.formState.errors.bio?.message}</FormInputError>
      <div className="flex justify-end mt-4">
        <Button disabled={isLoading || form.formState.isSubmitting} type="submit">
          {isLoading || form.formState.isSubmitting ? "Updating..." : "Change"}
        </Button>
      </div>
    </form>
  );
}

export default ChangeBioForm;
