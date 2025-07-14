import ChangeThemeBtn from "@/components/basic/ChangeThemeBtn";
import { SideBarLink } from "@/types/AppSideBar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCalendarEvent,
  IconClipboardList,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export const sideBarLink: SideBarLink[] = [
  {
    label: "Theme",
    href: "#",
    isLinkDissabled: true,
    icon: <ChangeThemeBtn fromDashboard={true} />,
  },
  {
    label: "Courses",
    href: "#",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Assignments",
    href: "/assignments",
    icon: (
      <IconClipboardList className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Events",
    href: "/events",
    icon: (
      <IconCalendarEvent className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Profile",
    href: "#",
    icon: (
      <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    isLinkDissabled: true,
    icon: (
      <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];
