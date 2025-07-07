import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Logo({
  isCollapsed = false,
}: {
  isCollapsed?: boolean;
}) {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-1 py-1 text-sm font-normal text-black dark:text-white select-none"
    >
      <div className="flex items-center justify-center size-9 shrink-0">
        <Image
          src="/logo.png"
          alt="Coalight Logo"
          width={100}
          height={100}
          className="size-full rounded-full object-cover"
        />
      </div>
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-[700] text-lg whitespace-nowrap "
        >
          Coalight
        </motion.span>
      )}
    </Link>
  );
}
