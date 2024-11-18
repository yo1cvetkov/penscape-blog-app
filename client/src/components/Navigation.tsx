import AuthRoutes from "./AuthRoutes";
import Logo from "./Logo";
import NavRoutes from "./NavRoutes";

export type Route = {
  label: string;
  path: string;
};

const routes: Route[] = [
  {
    label: "Home",
    path: "/",
  },
];

function Navigation() {
  return (
    <div className="border-b shadow-sm">
      <div className="container mx-auto flex gap-x-20 items-center px-4 py-4">
        <Logo />
        <nav className="flex items-center w-full justify-between">
          <NavRoutes routes={routes} />
          <AuthRoutes />
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
