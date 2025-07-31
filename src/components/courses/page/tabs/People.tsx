"use client";

import { motion } from "framer-motion";
import { User, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnrolledPeople } from "@/types/course";

interface PeopleProps {
  people: EnrolledPeople;
  onMenuClick?: (action: string, person: EnrolledPeople) => void;
}

export type PeopleRole = "ADMIN" | "MODERATOR" | "INSTRUCTOR" | "STUDENT";

const roleColors: Record<PeopleRole, string> = {
  ADMIN: "border-red-500 text-red-500 bg-red-500/10",
  MODERATOR: "border-purple-500 text-purple-500 bg-purple-500/10",
  INSTRUCTOR: "border-blue-500 text-blue-500 bg-blue-500/10",
  STUDENT: "border-green-500 text-green-500 bg-green-500/10",
};

const roleLabels: Record<PeopleRole, string> = {
  ADMIN: "Admin",
  MODERATOR: "Moderator",
  INSTRUCTOR: "Instructor",
  STUDENT: "Student",
};

export function People({ people, onMenuClick }: PeopleProps) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="p-3 group rounded-md border flex items-center gap-3 hover:bg-muted/50 max-w-4xl mx-auto cursor-pointer"
    >
      <div className={`p-2 rounded-full bg-gray-200/10 text-gray-600`}>
        <User className="h-4 w-4" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium">{people.user_name}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-muted-foreground">
            {people.user_email}
          </span>
        </div>
      </div>

      <div
        className={`text-xs px-2 py-1 rounded-full border ${
          roleColors[people.role as PeopleRole]
        }`}
      >
        {roleLabels[people.role as PeopleRole]}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => onMenuClick?.("edit", people)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMenuClick?.("remove", people)}>
            Remove
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMenuClick?.("message", people)}>
            Message
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
