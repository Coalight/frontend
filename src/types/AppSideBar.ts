// types.ts
import { ReactNode, ComponentType, JSX } from "react";

export type SideBarLink = {
  label: string;
  subLabel?: string;
  href: string;
  icon: JSX.Element | ReactNode;
  isLinkDissabled?: boolean;
};

export type SidebarContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
};

export type LinkBodyProps = Pick<SideBarLink, "label" | "subLabel">;

export interface NavItemProps {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  link?: string;
}

export interface NavItemsProps {
  children: ReactNode;
  isBottomNav?: boolean;
}

export interface AppSidebarProps {
  children: ReactNode;
}
