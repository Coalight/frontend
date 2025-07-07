"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/redux/hooks";

export default function NavItem({
  label,
  Icon,
  link = "#",
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  link?: string;
}) {
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
