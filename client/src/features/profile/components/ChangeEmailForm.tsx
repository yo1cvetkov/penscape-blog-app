import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changeEmailSchema, ChangeEmailSchema } from "../schemas/changeEmail.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import Button from "../../../components/ui/Button";

function ChangeEmailForm() {
  const user = useSelector((state: RootState) => state.auth.user);

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: user?.email,
    },
  });

  const onSubmit: SubmitHandler<ChangeEmailSchema> = (data) => {
    console.log(data);
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
        <Button type="submit">Change</Button>
      </div>
    </form>
  );
}

export default ChangeEmailForm;
