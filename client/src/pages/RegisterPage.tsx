import CardWrapper from "../components/ui/CardWrapper";
import RegisterForm from "../features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <section className="py-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 py-10">Penscape registration</h1>
      <CardWrapper>
        <RegisterForm />
      </CardWrapper>
    </section>
  );
}

export default RegisterPage;
