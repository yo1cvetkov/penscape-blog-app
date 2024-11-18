import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
