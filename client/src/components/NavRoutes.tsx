import NavRoute from "./NavRoute";
import { type Route } from "./Navigation";

interface NavRoutesProps {
  routes: Route[];
}

function NavRoutes({ routes }: NavRoutesProps) {
  return (
    <ul>
      {routes.map((route, idx) => (
        <NavRoute route={route} key={idx} />
      ))}
    </ul>
  );
}

export default NavRoutes;
