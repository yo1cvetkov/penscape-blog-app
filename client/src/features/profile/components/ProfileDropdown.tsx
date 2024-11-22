import { Button, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowLeftStartOnRectangleIcon, UserCircleIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../auth/api/authApiSlice";
import toast from "react-hot-toast";
import Spinner from "../../../components/ui/Spinner";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "../../auth/state/authSlice";

function ProfileDropdown() {
  const [logoutMutation, { isLoading, isError, error }] = useLogoutMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      if (window.confirm("Are you sure that you want to sign out?")) {
        await logoutMutation().unwrap();

        toast.success("You signed out successfully.");

        dispatch(setUser(undefined));
        dispatch(setIsAuthenticated(false));

        navigate("/signin");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu>
      <MenuButton>
        <UserCircleIcon className="fill-gray-500 size-8" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="border border-gray-100 shadow-sm focus:outline-none px-2 py-4 bg-white rounded-lg mt-2 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <Link
            className="flex items-center w-full rounded-lg transition duration-100 ease-out px-3 py-1.5 data-[focus]:bg-gray-50 text-sm gap-x-3"
            to={"/profile"}
            viewTransition
          >
            <UserIcon className="size-6 fill-gray-300" />
            My profile
          </Link>
        </MenuItem>
        <div className="h-px my-2 bg-gray-300/20" />
        <MenuItem>
          <Button
            disabled={isLoading}
            onClick={onLogout}
            className="flex items-center disabled:text-gray-400  disabled:cursor-not-allowed disabled:opacity-80 w-full text-red-400 rounded-lg transition duration-100 ease-out px-3 py-1.5 data-[focus]:bg-gray-50 text-sm gap-x-3"
          >
            {isLoading ? (
              <>
                <Spinner />
                Signing out...
              </>
            ) : (
              <>
                <ArrowLeftStartOnRectangleIcon className="size-5 fill-red-400" />
                Sign out
              </>
            )}
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdown;
