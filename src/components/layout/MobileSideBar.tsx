"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  toggleMobileSidebar,
  closeMobileSidebar,
} from "@redux/features/ui/uiSlice";
import { navItems, bottomItems } from "@/components/layout/Data.sidebarItems";
import { X } from "lucide-react";

export default function MobileSideBar() {
  const dispatch = useAppDispatch();
  const { isSideBarOpen } = useAppSelector((state) => state.ui.mobile);

  const toggleMobileMenu = () => dispatch(toggleMobileSidebar());
  const closeMenu = () => dispatch(closeMobileSidebar());

  return (
    <div
      className={`md:hidden fixed inset-0 z-50 transform ${
        isSideBarOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="absolute inset-0 backdrop-blur-md"
        onClick={closeMenu}
      ></div>
      <div className="absolute right-0 top-0 h-full w-64 bg-background border-l dark:border-gray-800 shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-between p-4 border-b dark:border-gray-800">
          <span className="font-semibold text-lg">Menu</span>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={closeMenu}
            >
              <item.Icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>
        <div className="p-4 border-t dark:border-gray-800 space-y-2">
          {bottomItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={closeMenu}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
