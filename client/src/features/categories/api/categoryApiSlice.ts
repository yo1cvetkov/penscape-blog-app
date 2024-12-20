import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../baseQuery";
import { Category } from "../types/Category";

export const categoriesApiSlice = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      getCategories: builder.query<Category[], void>({
        query: () => ({
          url: "/category",
          method: "GET",
        }),
      }),
      getCategory: builder.query<Category, { id: string }>({
        query: ({ id }) => ({
          url: `/category/${id}`,
          method: "GET",
        }),
      }),
    };
  },
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoriesApiSlice;
