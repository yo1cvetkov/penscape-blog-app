import { Field, Fieldset, Legend } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import FormLabel from "../../../components/ui/FormLabel";
import { signInSchema, SignInSchema } from "../schemas/signIn.schema";
import { useLoginMutation } from "../api/authApiSlice";
import Spinner from "../../../components/ui/Spinner";
import FormError from "../../../components/ui/FormError";

function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginMutation, { isLoading, isError, error }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    try {
      await loginMutation({ username: data.username, password: data.password }).unwrap();
      toast.success("You've successfully logged in.", { duration: 2000 });
      navigate("/", { viewTransition: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Fieldset as="div" className="p-6 space-y-6 rounded-xl sm:p-10">
        <Legend className="font-semibold text-base/7 ">Enter your account credentials</Legend>
        <Field as="div">
          <FormLabel htmlFor="username" required>
            Username
          </FormLabel>
          <Controller
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormInput
                disabled={isLoading || form.formState.isSubmitting}
                hasErrors={!!form.formState.errors.username?.message}
                type="text"
                id="username"
                {...field}
              />
            )}
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
            render={({ field }) => (
              <FormInput
                disabled={isLoading || form.formState.isSubmitting}
                hasErrors={!!form.formState.errors.password?.message}
                id="password"
                type="password"
                {...field}
              />
            )}
          />
          <FormInputError>{form.formState.errors.password?.message}</FormInputError>
        </Field>

        {isError && error ? <FormError error={error} /> : null}
        <div className="flex items-center justify-between">
          <Link
            viewTransition
            to={"/register"}
            className="inline-flex hover:underline hover:bg-transparent transition-all duration-200 items-center gap-2 rounded-xl py-1.5 px-3 text-sm/6 font-semibold text-gray-700 border-gray-400  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Don't have an account?
          </Link>
          <Button type="submit" disabled={isLoading || form.formState.isSubmitting}>
            {isLoading || form.formState.isSubmitting ? (
              <div className="flex items-center gap-x-3">
                <Spinner />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </Fieldset>
    </form>
  );
}

export default SignInForm;
