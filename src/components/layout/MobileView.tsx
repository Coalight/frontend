"use client";

import { ReactNode } from "react";
import MobileNavbar from "@/components/layout/MobileNavbar";
import MobileSideBar from "@/components/layout/MobileSideBar";

export default function MobileView({ children }: { children: ReactNode }) {
  return (
    <div className="md:hidden flex-1 flex flex-col overflow-hidden relative">
      <MobileNavbar />
      <MobileSideBar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
