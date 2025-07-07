/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";

import { FcGoogle } from "react-icons/fc";
import { Bell, Calendar, Folder, GraduationCap, Sparkles } from "lucide-react";
import { UserCog } from "lucide-react";
import { PiArrowRightThin } from "react-icons/pi";
import { RiHome4Line } from "react-icons/ri";
import { LuFolderArchive, LuGraduationCap } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
// Higher-order function to wrap icons with default props
const withDefaultProps = <T extends React.ElementType>(
  Icon: T,
  defaultClassName: string,
  defaultSize = 16
) => {
  return ({ className, size, ...props }: IconProps) => {
    return (
      <Icon
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
        size={size ?? defaultSize}
        className={cn(defaultClassName, className)}
      />
    );
  };
};

const Icons = {
  gitHub: ({ className }: { className?: string }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  eye: ({ className }: { className?: string }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: ({ className }: { className?: string }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  ),
  google: withDefaultProps(FcGoogle, "text-2xl"),
  graduateCap: withDefaultProps(GraduationCap, "text-2xl"),
  userCog: withDefaultProps(UserCog, "text-2xl"),
  arrowRight: withDefaultProps(PiArrowRightThin, "text-2xl"),
  home: withDefaultProps(RiHome4Line, "text-2xl"),
  cap: withDefaultProps(LuGraduationCap, "text-2xl"),
  calender: withDefaultProps(Calendar, "text-2xl"),
  dashboard: withDefaultProps(MdOutlineDashboard, "text-2xl"),
  folder: withDefaultProps(Folder, "text-2xl"),
  notification: withDefaultProps(Bell, "text-2xl"),
  archive: withDefaultProps(LuFolderArchive, "text-2xl"),
  ai: withDefaultProps(Sparkles, "text-2xl"),
};

export default Icons;
