import { Description, Field, Fieldset, Legend } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormLabel from "../../../components/ui/FormLabel";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { signInSchema, SignInSchema } from "../schemas/signIn.schema";

function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    console.log(data);
    toast.success("Form submitted");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Fieldset as="div" className="space-y-6 rounded-xl p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold ">Enter your account credentials</Legend>
        <Field as="div">
          <FormLabel htmlFor="username" required>
            Username
          </FormLabel>
          <Controller
            control={form.control}
            name="username"
            render={({ field }) => <FormInput hasErrors={!!form.formState.errors.username?.message} type="text" id="username" {...field} />}
          />
          <FormInputError>{form.formState.errors.username?.message}</FormInputError>
        </Field>

        <Field>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => <FormInput hasErrors={!!form.formState.errors.password?.message} id="password" type="password" {...field} />}
          />
          <FormInputError>{form.formState.errors.password?.message}</FormInputError>
        </Field>

        <div className="flex items-center justify-between">
          <Link
            viewTransition
            to={"/register"}
            className="inline-flex hover:underline hover:bg-transparent transition-all duration-200 items-center gap-2 rounded-xl py-1.5 px-3 text-sm/6 font-semibold text-gray-700 border-gray-400  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Don't have an account?
          </Link>
          <Button>Sign in</Button>
        </div>
      </Fieldset>
    </form>
  );
}

export default SignInForm;
