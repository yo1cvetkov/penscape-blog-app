import FormInput from "../../../components/ui/FormInput";
import Button from "../../../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changeUsernameSchema, ChangeUsernameSchema } from "../schemas/changeUsername.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputError from "../../../components/ui/FormInputError";
function ChangeUsernameForm() {
  const user = useSelector((state: RootState) => state.auth.user);

  const form = useForm<ChangeUsernameSchema>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      username: user?.username,
    },
  });

  const onSubmit: SubmitHandler<ChangeUsernameSchema> = (data) => {
    console.log(data);
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
        <Button type="submit">Change</Button>
      </div>
    </form>
  );
}

export default ChangeUsernameForm;
