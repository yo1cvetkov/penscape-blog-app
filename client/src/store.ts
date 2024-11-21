import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/state/authSlice";
import { authApiSlice } from "./features/auth/api/authApiSlice";
import { postsApiSlice } from "./features/posts/api/postsApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware).concat(postsApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
