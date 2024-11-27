import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/state/authSlice";
import { authApiSlice } from "./features/auth/api/authApiSlice";
import { postsApiSlice } from "./features/posts/api/postsApiSlice";
import { profileApiSlice } from "./features/profile/api/profileApiSlice";
import { categoriesApiSlice } from "./features/categories/api/categoryApiSlice";
import { usersApiSlice } from "./features/users/api/usersApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(postsApiSlice.middleware)
      .concat(profileApiSlice.middleware)
      .concat(categoriesApiSlice.middleware)
      .concat(usersApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
