import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changeEmailSchema, ChangeEmailSchema } from "../schemas/changeEmail.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import Button from "../../../components/ui/Button";
import { useUpdateUserInfoMutation } from "../api/profileApiSlice";
import toast from "react-hot-toast";
import { useClose } from "@headlessui/react";

function ChangeEmailForm() {
  const user = useSelector((state: RootState) => state.auth.user);

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: user?.email,
    },
  });

  let close = useClose();

  const [updateUserInfoMutation, { isLoading }] = useUpdateUserInfoMutation();

  const onSubmit: SubmitHandler<ChangeEmailSchema> = async (data) => {
    try {
      await updateUserInfoMutation({ email: data.email }).unwrap();

      close();

      toast.success("User email updated successfully.");
    } catch (error) {
      toast.error("Failed to update user email.");
    }
  };

  return (
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => <FormInput disabled={form.formState.isSubmitting} hasErrors={!!form.formState.errors.email?.message} type="text" {...field} />}
      />
      <FormInputError>{form.formState.errors.email?.message}</FormInputError>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading || form.formState.isSubmitting}>
          {isLoading || form.formState.isSubmitting ? "Updating..." : "Change"}
        </Button>
      </div>
    </form>
  );
}

export default ChangeEmailForm;
