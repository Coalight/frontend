import Icons from "@/components/icons";
import { Settings, LifeBuoy } from "lucide-react";

export const navItems = [
  { label: "Dashboard", Icon: Icons.dashboard, link: "/dashboard" },
  { label: "Calendar", Icon: Icons.calendar, link: "/calendar" },
  { label: "Archive", Icon: Icons.archive, link: "/archive" },
  { label: "AI Assistant", Icon: Icons.ai, link: "/ai" },
];

export const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: LifeBuoy, label: "Support" },
];

export const notifications = [
  {
    id: 1,
    title: "New Assignment Posted",
    course: "Web Development",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New Comment on Your Post",
    course: "Blogging",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 3,
    title: "New Course Available",
    course: "Graphic Design",
    time: "1 day ago",
    read: false,
  },
];
