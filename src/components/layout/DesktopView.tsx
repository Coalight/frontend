"use client";

import { ReactNode } from "react";
import DesktopSideBar from "@/components/layout/DesktopSideBar";
import DesktopNavBar from "@/components/layout/DesktopNavBar";

export default function DesktopView({ children }: { children: ReactNode }) {
  return (
    <>
      <DesktopSideBar />
      <div className="hidden md:flex flex-1  flex-col overflow-hidden">
        <DesktopNavBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
