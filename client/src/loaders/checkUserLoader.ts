import { redirect } from "react-router-dom";
import { store } from "../store";
import { clearUser, setIsAuthenticated, setUser } from "../features/auth/state/authSlice";
import { authApiSlice } from "../features/auth/api/authApiSlice";

export const checkUserLoader = async () => {
  const state = store.getState();

  const cachedUser = authApiSlice.endpoints.getUser.select()(state).data;

  if (cachedUser) {
    return cachedUser;
  }

  const result = await store.dispatch(authApiSlice.endpoints.getUser.initiate());

  if (result.error) {
    store.dispatch(clearUser());
    store.dispatch(setIsAuthenticated(false));
    throw redirect("/signin");
  }

  const user = result.data;

  store.dispatch(setUser(user));

  store.dispatch(setIsAuthenticated(true));

  return user;
};
