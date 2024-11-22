import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { UserCircleIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function ProfileDropdown() {
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
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdown;
