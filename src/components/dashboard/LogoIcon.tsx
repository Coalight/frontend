import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";

export default function LogoIcon({ className }: { className?: ClassValue }) {
  return (
    <div className="flex items-center justify-center size-8 shrink-0">
      <Image
        src="/logo.png"
        alt="Coalight Logo"
        width={24}
        height={24}
        className={cn(
          "size-full rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm object-cover",
          className
        )}
      />
    </div>
  );
}
