import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { User } from "../../auth/types/User";

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => {
    return {
      getUser: builder.query<User, string>({
        query: (id) => ({
          url: `/users/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, id) => [{ type: "User", id }],
      }),
    };
  },
});

export const { useGetUserQuery } = usersApiSlice;
