import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Root() {
  return (
    <div>
      <Navigation />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
