"use client";

import { useAppSelector } from "@/redux/hooks";
import AppBranding from "@/components/layout/AppBranding";
import NavItems from "@/components/layout/NavItems";
import NavItem from "@/components/layout/NavItem";
import { navItems, bottomItems } from "@/components/layout/Data.sidebarItems";

export default function DesktopSideBar() {
  const isCollapsed = useAppSelector(
    (state) => state.ui.desktop.isSideBarCollapsed
  );

  return (
    <aside
      className={`hidden md:flex flex-col border-r dark:border-gray-800 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-52"
      }`}
    >
      <AppBranding />
      <NavItems>
        {navItems.map((item, idx) => (
          <NavItem
            key={idx}
            label={item.label}
            Icon={item.Icon}
            link={item.link}
          />
        ))}
      </NavItems>
      <NavItems isBottomNav>
        {bottomItems.map((item) => (
          <NavItem label={item.label} Icon={item.icon} key={item.label} />
        ))}
      </NavItems>
    </aside>
  );
}
