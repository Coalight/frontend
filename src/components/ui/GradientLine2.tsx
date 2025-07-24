import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export function GradientLine2({className}: {className?: ClassValue}) {
  return (
    <div className={cn("w-full relative mx-auto",className)} data-testid="gradient-line">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[10px] w-1/4 blur-sm" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[2px] w-1/4" />
    </div>
  );
}