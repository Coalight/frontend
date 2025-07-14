import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export const FormField = ({
  label,
  children,
  id,
  className,
}: {
  label: string;
  children: React.ReactNode;
  id?: string;
  className?: ClassValue;
}) => (
  <div className={cn("space-y-2", className)}>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-foreground/80"
    >
      {label}
    </label>
    {children}
  </div>
);
