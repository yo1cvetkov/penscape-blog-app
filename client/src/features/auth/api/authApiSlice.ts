import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateUser, User } from "../types/User";
import baseQueryWithReauth from "../../../baseQuery";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      register: builder.mutation<User, CreateUser>({
        query: (userPayload) => ({
          url: "/auth/register",
          method: "POST",
          body: userPayload,
        }),
      }),
      login: builder.mutation<void, { email: string; password: string }>({
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
      }),
      refreshToken: builder.mutation<void, void>({
        query: () => ({
          url: "/auth/refresh",
          method: "POST",
          credentials: "include",
        }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
      }),
      getUser: builder.query<User, void>({
        query: () => ({
          url: "/auth/me",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useRegisterMutation, useGetUserQuery, useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApiSlice;
