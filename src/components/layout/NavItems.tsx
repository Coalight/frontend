"use client";

import { ReactNode } from "react";

export default function NavItems({
  children,
  isBottomNav = false,
}: {
  children: ReactNode;
  isBottomNav?: boolean;
}) {
  return isBottomNav ? (
    <div className="p-2 border-t dark:border-gray-800 space-y-2">
      {children}
    </div>
  ) : (
    <nav className="flex-1 p-2 space-y-2 overflow-y-auto">{children}</nav>
  );
}
