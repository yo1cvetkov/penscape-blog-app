import { Field, Fieldset } from "@headlessui/react";
import FormLabel from "../../../components/ui/FormLabel";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema, ChangePasswordSchema } from "../schemas/changePassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/Button";

function ChangePasswordForm() {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    console.log(data);
  };

  return (
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Fieldset as="div" className="space-y-2">
        <Field as="div">
          <FormLabel htmlFor="password" required>
            Old password
          </FormLabel>
          <Controller
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormInput disabled={form.formState.isSubmitting} hasErrors={!!form.formState.errors.oldPassword?.message} {...field} type="password" />
            )}
          />
          <FormInputError>{form.formState.errors.oldPassword?.message}</FormInputError>
        </Field>
        <Field as="div">
          <FormLabel htmlFor="password" required>
            New password
          </FormLabel>
          <Controller
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormInput disabled={form.formState.isSubmitting} hasErrors={!!form.formState.errors.newPassword?.message} {...field} type="password" />
            )}
          />
          <FormInputError>{form.formState.errors.newPassword?.message}</FormInputError>
        </Field>
        <Field as="div">
          <FormLabel htmlFor="password" required>
            Confirm new password
          </FormLabel>
          <Controller
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormInput disabled={form.formState.isSubmitting} hasErrors={!!form.formState.errors.repeatPassword?.message} {...field} type="password" />
            )}
          />
          <FormInputError>{form.formState.errors.repeatPassword?.message}</FormInputError>
        </Field>
      </Fieldset>
      <div className="flex justify-end mt-4">
        <Button type="submit">Update password</Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
