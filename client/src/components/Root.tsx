import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

function Root() {
  return (
    <div className="relative">
      <Navigation />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
