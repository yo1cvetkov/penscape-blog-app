import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import { checkUserLoader } from "./loaders/checkUserLoader";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import CreatePostIdPage from "./pages/CreatePostIdPage";
import PostIdPage from "./pages/PostIdPage";
import PublishPostIdPage from "./pages/PublishPostIdPage";

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
      {
        path: "/post/:id",
        element: <PostIdPage />,
        loader: checkUserLoader,
      },
      {
        path: "/post/create",
        element: <CreatePostPage />,
        loader: checkUserLoader,
      },
      {
        path: "/post/create/:id",
        element: <CreatePostIdPage />,
        loader: checkUserLoader,
      },
      {
        path: "/post/create/:id/publish",
        element: <PublishPostIdPage />,
        loader: checkUserLoader,
      },
    ],
  },
]);
