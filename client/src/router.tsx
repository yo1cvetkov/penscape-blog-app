import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import { checkUserLoader } from "./loaders/checkUserLoader";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: checkUserLoader,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: checkUserLoader,
      },
    ],
  },
]);
