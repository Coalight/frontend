"use client";

import { useAppSelector } from "@/redux/hooks";
import Logo from "./Logo";

export default function AppBranding() {
  const isCollapsed = useAppSelector(
    (state) => state.ui.desktop.isSideBarCollapsed
  );
  return (
    <div
      className={`h-16 p-4 border-b dark:border-gray-800 flex items-center ${
        isCollapsed ? "justify-center" : "justify-between"
      }`}
    >
      <div className="flex items-center">
        <Logo isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
