import FormInput from "../../../components/ui/FormInput";
import Button from "../../../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changeUsernameSchema, ChangeUsernameSchema } from "../schemas/changeUsername.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputError from "../../../components/ui/FormInputError";
import { useUpdateUserInfoMutation } from "../api/profileApiSlice";
import toast from "react-hot-toast";
import { useClose } from "@headlessui/react";
function ChangeUsernameForm() {
  const user = useSelector((state: RootState) => state.auth.user);

  let close = useClose();

  const form = useForm<ChangeUsernameSchema>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      username: user?.username,
    },
  });

  const [updateUserInfoMutation, { isLoading }] = useUpdateUserInfoMutation();

  const onSubmit: SubmitHandler<ChangeUsernameSchema> = async (data) => {
    try {
      await updateUserInfoMutation({ username: data.username }).unwrap();

      close();
      toast.success("Username updated successfully.");
    } catch (error) {
      toast.error("Failed to update username");
    }
  };

  return (
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={form.control}
        render={({ field }) => (
          <FormInput disabled={form.formState.isSubmitting} hasErrors={!!form.formState.errors.username?.message} type="text" {...field} />
        )}
      />
      <FormInputError>{form.formState.errors.username?.message}</FormInputError>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading || form.formState.isSubmitting}>
          {isLoading || form.formState.isSubmitting ? "Updating..." : "Change"}
        </Button>
      </div>
    </form>
  );
}

export default ChangeUsernameForm;
