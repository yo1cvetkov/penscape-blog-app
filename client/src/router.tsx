import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <div>This is root route</div>,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
