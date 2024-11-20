import { Description, Field, Fieldset, Legend } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../components/ui/FormInput";
import FormInputError from "../../../components/ui/FormInputError";
import FormLabel from "../../../components/ui/FormLabel";
import FormTextarea from "../../../components/ui/FormTextarea";
import { registerSchema, RegisterSchema } from "../schemas/register.schema";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setIsAuthenticated } from "../state/authSlice";
import { useRegisterMutation } from "../api/authApiSlice";
import { getErrorMessage, isFetchBaseQueryError } from "../../../helpers/error";
import Spinner from "../../../components/ui/Spinner";
import FormError from "../../../components/ui/FormError";

function RegisterForm() {
  //const authState = useSelector((state: RootState) => state.auth);

  // const dispatch = useDispatch();

  const [registerMutation, { isLoading, isError, error }] = useRegisterMutation();

  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      await registerMutation({ email: data.email, username: data.username, password: data.password, bio: data.bio }).unwrap();
      toast.success("You've successfully registered. Please sign in", { duration: 4000 });
      navigate("/signin", { viewTransition: true });
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(authState.isAuthenticated);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Fieldset as="div" className="p-6 space-y-6 rounded-xl sm:p-10">
        <Legend className="font-semibold text-base/7 ">Personal details</Legend>
        <Field as="div">
          <FormLabel htmlFor="username" required>
            Username
          </FormLabel>
          <Description className="text-sm/6 text-slate-500">Make sure that your username is unique.</Description>
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
          <FormLabel required htmlFor="email">
            Email address
          </FormLabel>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput
                disabled={isLoading || form.formState.isSubmitting}
                hasErrors={!!form.formState.errors.email?.message}
                id="email"
                type="email"
                {...field}
              />
            )}
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
        <Field>
          <FormLabel htmlFor="repeatPassword" required>
            Repeat password
          </FormLabel>
          <Controller
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormInput
                disabled={isLoading || form.formState.isSubmitting}
                id="repeatPassword"
                type="password"
                {...field}
                hasErrors={!!form.formState.errors.repeatPassword?.message}
              />
            )}
          />
          <FormInputError>{form.formState.errors.repeatPassword?.message}</FormInputError>
        </Field>
        <Field>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Description className="text-sm/6 text-slate-500">Say something about you. (optional)</Description>
          <Controller
            name="bio"
            control={form.control}
            render={({ field }) => <FormTextarea disabled={isLoading || form.formState.isSubmitting} id="bio" {...field} />}
          />
        </Field>
        {isError && error ? <FormError error={error} /> : null}

        <div className="flex items-center justify-between">
          <Link
            viewTransition
            to={"/signin"}
            className="inline-flex hover:underline hover:bg-transparent transition-all duration-200 items-center gap-2 rounded-xl py-1.5 px-3 text-sm/6 font-semibold text-gray-700 border-gray-400  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Already have an account?
          </Link>
          <Button type="submit" disabled={isLoading || form.formState.isSubmitting}>
            {isLoading || form.formState.isSubmitting ? (
              <div className="flex items-center gap-x-3">
                <Spinner />
                <span>Submitting...</span>
              </div>
            ) : (
              "Create an account"
            )}
          </Button>
          {/* <Button onClick={() => dispatch(setIsAuthenticated())}>Set is authenticated</Button> */}
        </div>
      </Fieldset>
    </form>
  );
}

export default RegisterForm;
