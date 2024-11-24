import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import CreatePostButton from "../features/posts/components/CreatePostButton";

function Root() {
  return (
    <div className="relative">
      <Navigation />
      <main className="container px-4 mx-auto">
        <Outlet />
        <CreatePostButton />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
