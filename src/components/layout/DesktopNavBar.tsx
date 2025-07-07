"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleDesktopSidebar } from "@redux/features/ui/uiSlice";
import ProfileDropdown from "@/components/layout/ProfileDropdown";
import Notification from "@/components/layout/Notification";

export default function DesktopNavBar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { isSideBarCollapsed } = useAppSelector((state) => state.ui.desktop);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleSidebar = () => dispatch(toggleDesktopSidebar());

  return (
    <nav className="hidden md:flex items-center justify-between h-16 px-4 border-b dark:border-gray-800">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-sm"
        >
          {isSideBarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Notification />
        <ProfileDropdown />
      </div>
    </nav>
  );
}
