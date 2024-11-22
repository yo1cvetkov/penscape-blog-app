import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";

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
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      }),
    };
  },
});

export const { useUpdateAvatarMutation } = profileApiSlice;
