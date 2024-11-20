import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface APIError {
  status: number;
  data: {
    cause: {
      statusCode: number;
    };
    message: string;
  };
}

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === "object" && error !== null && "status" in error;
};

export const isErrorWithMessage = (error: unknown): error is APIError => {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    (error as any).data !== null &&
    "message" in (error as any).data &&
    typeof (error as any).data.message === "string"
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (isErrorWithMessage(error)) {
    return error.data.message;
  }

  return "An uknown error occurred.";
};
