import CardWrapper from "../components/ui/CardWrapper";
import SignInForm from "../features/auth/components/SignInForm";

function SignInPage() {
  return (
    <section className="py-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 py-10">Welcome back, please sign in</h1>
      <CardWrapper>
        <SignInForm />
      </CardWrapper>
    </section>
  );
}

export default SignInPage;
