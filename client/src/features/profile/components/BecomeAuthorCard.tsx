import { RocketLaunchIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/ui/Button";

function BecomeAuthorCard() {
  return (
    <div className="w-full max-w-xl mx-auto mt-4 border-none rounded-lg shadow-lg bg-gradient-to-r from-amber-200 to-yellow-400">
      <div className="p-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-6">
            <RocketLaunchIcon className="size-12 text-amber-800" />
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl text-amber-900">Become a Certified Author</h2>
              <p className="max-w-md mt-1 text-amber-800">Join our exclusive community of certified authors and unlock new opportunities!</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="bg-black data-[hover]:bg-gray-900">Get certified now</Button>
        </div>
      </div>
    </div>
  );
}

export default BecomeAuthorCard;
