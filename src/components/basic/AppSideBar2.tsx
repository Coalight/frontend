"use client";

import { ReactNode, useState } from "react";
import { useTheme } from "next-themes";
import Icons from "@/components/icons";
import {
  Settings,
  LifeBuoy,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "../dashboard/Logo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  toggleDesktopSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
} from "@redux/features/ui/uiSlice";
import { NavItemProps, NavItemsProps, AppSidebarProps } from "@/types";
import Link from "next/link";
import LogoutBtn from "../auth/LogoutBtn";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", Icon: Icons.dashboard, link: "/dashboard" },
  { label: "Courses", Icon: Icons.graduateCap, link: "/courses" },
  { label: "Projects", Icon: Icons.folder, link: "/projects" },
  { label: "Notifications", Icon: Icons.notification, link: "/notifications" },
  { label: "Calendar", Icon: Icons.calender, link: "/calender" },
  { label: "Archive", Icon: Icons.archive, link: "/archive" },
];

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: LifeBuoy, label: "Support" },
];

export function AppSidebar({ children }: AppSidebarProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DesktopSideBar>
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
      </DesktopSideBar>

      <MainView>{children}</MainView>
    </div>
  );
}

export function DesktopSideBar({ children }: { children: ReactNode }) {
  const isCollapsed = useAppSelector(
    (state) => state.ui.desktop.isSideBarCollapsed
  );
  return (
    <aside
      className={`hidden md:flex flex-col border-r dark:border-gray-800 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-52"
      }`}
    >
      {children}
    </aside>
  );
}

export function AppBranding() {
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

export function NavItems({ children, isBottomNav = false }: NavItemsProps) {
  return isBottomNav ? (
    <div className="p-2 border-t dark:border-gray-800 space-y-2">
      {children}
    </div>
  ) : (
    <nav className="flex-1 p-2 space-y-2 overflow-y-auto">{children}</nav>
  );
}

export function NavItem({ label, Icon, link = "#" }: NavItemProps) {
  const isCollapsed = useAppSelector(
    (state) => state.ui.desktop.isSideBarCollapsed
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={link} passHref>
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            className={`w-full justify-start rounded-sm ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Icon className="size-5" />
            {!isCollapsed && <span className="ml-2">{label}</span>}
          </Button>
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}

export function MainView({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <MobileTopNav />
      <MobileSidebar />
      <DesktopTopNav />
      <MainContent>{children}</MainContent>
    </div>
  );
}

export function MobileTopNav() {
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

export function DesktopTopNav() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { isSideBarCollapsed } = useAppSelector((state) => state.ui.desktop);
  const [hasNotifications] = useState(true);

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

        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Button>
        <ProfileDropdown />
      </div>
    </nav>
  );
}

export function MainContent({ children }: { children: ReactNode }) {
  return <main className="flex-1 overflow-auto ">{children}</main>;
}

export function MobileSidebar() {
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

export function ProfileDropdown() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-sm">
        <DropdownMenuItem
          className="gap-2"
          onClick={() => router.push("/profile")}
        >
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => router.push("/settings")}
        >
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
