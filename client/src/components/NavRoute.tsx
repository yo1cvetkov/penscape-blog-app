import { NavLink } from "react-router-dom";
import { Route } from "./Navigation";

interface NavRouteProps {
  route: Route;
}

function NavRoute({ route }: NavRouteProps) {
  return (
    <li>
      <NavLink to={route.path} className={({ isActive }) => (isActive ? "text-sm underline" : "text-sm")} viewTransition>
        {route.label}
      </NavLink>
    </li>
  );
}

export default NavRoute;
