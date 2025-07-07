"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMobileSidebar } from "@redux/features/ui/uiSlice";
import Logo from "../dashboard/Logo";
import ProfileDropdown from "@/components/layout/ProfileDropdown";

export default function MobileNavbar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { isSideBarOpen } = useAppSelector((state) => state.ui.mobile);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleMobileMenu = () => dispatch(toggleMobileSidebar());

  return (
    <header className="md:hidden flex flex-col border-b dark:border-gray-800">
      <div className="h-16 flex items-center justify-between p-4">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <ProfileDropdown />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isSideBarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
