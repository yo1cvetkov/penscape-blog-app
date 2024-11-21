import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "default";
  noLabel?: boolean;
}

function Logo({ size, noLabel = false }: LogoProps) {
  return (
    <Link to={"/"} viewTransition className="flex items-center gap-x-2">
      <div className={`relative ${size === "sm" ? "w-6 h-6" : "w-8 h-8"}`}>
        <img src="logo.svg" alt="logo" className="w-full" />
      </div>
      {noLabel ? null : <span className="font-semibold text-slate-900">Penscape</span>}
    </Link>
  );
}

export default Logo;
