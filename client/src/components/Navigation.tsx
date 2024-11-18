import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navigation() {
  return (
    <div className="border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <Logo />
        <div className="flex items-center gap-x-4">
          <Link
            viewTransition
            to={"/signin"}
            className="inline-flex hover:bg-gray-800 transition-all duration-200 items-center gap-2 rounded-xl bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Sign in
          </Link>
          <Link
            viewTransition
            to={"/register"}
            className="inline-flex hover:bg-gray-100 transition-all duration-200 items-center gap-2 rounded-xl py-1.5 px-3 text-sm/6 font-semibold text-gray-700 border-gray-400 border shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
