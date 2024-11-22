import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { authApiSlice } from "../../auth/api/authApiSlice";

interface UpdateAvatarParams {
  formData: FormData;
  id: string;
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
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;

            dispatch(authApiSlice.util.invalidateTags(["User"]));
          } catch {}
        },
      }),
    };
  },
});

export const { useUpdateAvatarMutation } = profileApiSlice;
