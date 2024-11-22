import { useSelector } from "react-redux";
import AuthRoutes from "./AuthRoutes";
import Logo from "./Logo";
import NavRoutes from "./NavRoutes";
import { RootState } from "../store";
import ProfileDropdown from "../features/profile/components/ProfileDropdown";

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
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="border-b shadow-sm">
      <div className="container flex items-center px-4 py-4 mx-auto gap-x-20">
        <Logo />
        <nav className="relative flex items-center justify-between w-full">
          <NavRoutes routes={routes} />
          {user ? <ProfileDropdown /> : <AuthRoutes />}
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
