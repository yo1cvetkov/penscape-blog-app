import { XCircleIcon } from "@heroicons/react/24/outline";
import { getErrorMessage } from "../../helpers/error";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface FormErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

function FormError({ error }: FormErrorProps) {
  return (
    <div className="flex items-center w-full px-4 py-2 text-red-500 border border-red-300 rounded-lg gap-x-2 bg-red-100/50 text-sm/4">
      <XCircleIcon className="text-red-500 size-5" />
      {getErrorMessage(error)}
    </div>
  );
}

export default FormError;
