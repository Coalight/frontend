"use client";

import { ReactNode } from "react";
import DesktopView from "@/components/layout/DesktopView";
import MobileView from "@/components/layout/MobileView";

export default function AppSidebar({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DesktopView>{children}</DesktopView>
      <MobileView>{children}</MobileView>
    </div>
  );
}
