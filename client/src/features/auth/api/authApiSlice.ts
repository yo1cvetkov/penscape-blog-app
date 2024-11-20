import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUser, User } from "../types/User";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth",
  }),
  endpoints: (builder) => {
    return {
      register: builder.mutation<User, CreateUser>({
        query: (userPayload) => ({
          url: "/register",
          method: "POST",
          body: userPayload,
        }),
      }),
    };
  },
});

export const { useRegisterMutation } = authApiSlice;
