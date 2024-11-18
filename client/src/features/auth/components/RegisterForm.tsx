import { Description, Field, Fieldset, Legend } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import FormLabel from "../../../components/ui/FormLabel";
import FormTextarea from "../../../components/ui/FormTextarea";
import { registerSchema, RegisterSchema } from "../schemas/register.schema";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";

function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log(data);
    toast.success("Form submitted");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Fieldset as="div" className="space-y-6 rounded-xl p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold ">Personal details</Legend>
        <Field as="div">
          <FormLabel htmlFor="username" required>
            Username
          </FormLabel>
          <Description className="text-sm/6 text-slate-500">Make sure that your username is unique.</Description>
          <Controller
            control={form.control}
            name="username"
            render={({ field }) => <FormInput hasErrors={!!form.formState.errors.username?.message} type="text" id="username" {...field} />}
          />
          <FormInputError>{form.formState.errors.username?.message}</FormInputError>
        </Field>
        <Field>
          <FormLabel required htmlFor="email">
            Email address
          </FormLabel>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => <FormInput hasErrors={!!form.formState.errors.email?.message} id="email" type="email" {...field} />}
          />
          <FormInputError>{form.formState.errors.email?.message}</FormInputError>
        </Field>
        <Field>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <Description className="text-sm/5 text-slate-500">Min. 6 characters long with uppercase letters, numbers and special symbols.</Description>
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => <FormInput hasErrors={!!form.formState.errors.password?.message} id="password" type="password" {...field} />}
          />
          <FormInputError>{form.formState.errors.password?.message}</FormInputError>
        </Field>
        <Field>
          <FormLabel htmlFor="repeatPassword" required>
            Repeat password
          </FormLabel>
          <Controller
            control={form.control}
            name="repeatPassword"
            render={({ field }) => <FormInput id="repeatPassword" type="password" {...field} hasErrors={!!form.formState.errors.repeatPassword?.message} />}
          />
          <FormInputError>{form.formState.errors.repeatPassword?.message}</FormInputError>
        </Field>
        <Field>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Description className="text-sm/6 text-slate-500">Say something about you. (optional)</Description>
          <Controller name="bio" control={form.control} render={({ field }) => <FormTextarea id="bio" {...field} />} />
        </Field>
        <div className="flex items-center justify-between">
          <Link
            viewTransition
            to={"/signin"}
            className="inline-flex hover:underline hover:bg-transparent transition-all duration-200 items-center gap-2 rounded-xl py-1.5 px-3 text-sm/6 font-semibold text-gray-700 border-gray-400  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Already have an account?
          </Link>
          <Button>Create an account</Button>
        </div>
      </Fieldset>
    </form>
  );
}

export default RegisterForm;
