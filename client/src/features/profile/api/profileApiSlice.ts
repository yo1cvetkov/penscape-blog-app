import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { authApiSlice } from "../../auth/api/authApiSlice";
import { setUser } from "../../auth/state/authSlice";
import { User } from "../../auth/types/User";

interface UpdateAvatarParams {
  formData: FormData;
  id: string;
}

interface UpdateUserInfoParams {
  username?: string;
  email?: string;
  bio?: string;
}

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      updateAvatar: builder.mutation<void, UpdateAvatarParams>({
        query: ({ id, formData }) => ({
          url: `/users/${id}/avatar`,
          method: "PATCH",
          body: formData,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(authApiSlice.util.invalidateTags(["User"]));
          } catch {}
        },
      }),
      updateUserInfo: builder.mutation<User, UpdateUserInfoParams>({
        query: (data) => ({
          url: `/users`,
          method: "PUT",
          body: data,
          credentials: "include",
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;

            dispatch(authApiSlice.util.invalidateTags(["User"]));
          } catch {}
        },
      }),
    };
  },
});

export const { useUpdateAvatarMutation, useUpdateUserInfoMutation } = profileApiSlice;
