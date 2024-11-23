import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateUser, User } from "../types/User";
import baseQueryWithReauth from "../../../baseQuery";
import { clearUser, setUser } from "../state/authSlice";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => {
    return {
      register: builder.mutation<User, CreateUser>({
        query: (userPayload) => ({
          url: "/auth/register",
          method: "POST",
          body: userPayload,
        }),
      }),
      login: builder.mutation<void, { username: string; password: string }>({
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["User"],
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
        invalidatesTags: ["User"],
      }),
      getUser: builder.query<User, void>({
        query: () => ({
          url: "/auth/me",
          method: "GET",
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUser(data));
          } catch (error) {
            dispatch(clearUser());
          }
        },
        providesTags: ["User"],
      }),
    };
  },
});

export const { useRegisterMutation, useGetUserQuery, useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApiSlice;
