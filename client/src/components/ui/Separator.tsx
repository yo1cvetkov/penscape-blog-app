import { cn } from "../../helpers/cn";

function Separator({ className }: { className?: string }) {
  return <hr className={cn("w-full h-px my-4 text-zinc-300", className)} />;
}

export default Separator;
