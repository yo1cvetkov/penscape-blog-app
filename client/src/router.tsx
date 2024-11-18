import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <div>This is root route</div>,
      },
    ],
  },
]);
