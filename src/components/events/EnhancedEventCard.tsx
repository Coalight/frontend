"use client";

import { motion } from "framer-motion";
import { MoreVertical, Trash2, Edit, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatShortDate,
  formatTimeSince_new,
  formatToAMPM,
} from "@/lib/utils";
import { CourseEvent, EventType } from "@/types/event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventIcons, eventTypeClasses } from "./eventCardData";

interface EnhancedEventCardProps {
  data: CourseEvent & { url?: string };
  hideCourseCode?: boolean;
  userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MODERATOR";
  onDelete?: (eventId: string | number) => void;
  onEdit?: (event: CourseEvent) => void;
}

const capitalize = (s: string) => {
  if (typeof s !== "string" || !s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const EnhancedEventCard = ({
  data,
  hideCourseCode = false,
  userRole,
  onDelete,
  onEdit,
}: EnhancedEventCardProps) => {
  const canDelete = userRole && ["ADMIN", "INSTRUCTOR"].includes(userRole);
  const canEdit = userRole && ["ADMIN", "INSTRUCTOR"].includes(userRole);

  const eventType = data.type as EventType;
  const typeClass = eventTypeClasses[eventType] || eventTypeClasses.other;
  const typeIcon = eventIcons[eventType] || eventIcons.other;

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="group p-3 rounded-lg border flex items-center gap-4 hover:bg-muted/50 max-w-4xl mx-auto"
    >
      {/* Left Icon */}
      <div className={`p-2 rounded-full flex-shrink-0 ${typeClass}`}>
        {typeIcon}
      </div>

      {/* Middle Content */}
      <div className="flex-1">
        <p className="text-sm font-medium">{data.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {!hideCourseCode && (
            <Badge variant="outline">{data.courseCode}</Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatShortDate(data.date)} • {formatToAMPM(data.time)}
          </span>
        </div>
      </div>

      {/* Right side container */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground hidden sm:block">
          {formatTimeSince_new(data.updatedAt)}
        </span>

        {(canDelete || canEdit) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {canEdit && (
                <DropdownMenuItem onClick={() => onEdit?.(data)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </DropdownMenuItem>
              )}
              {canDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete?.(data.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded-full text-muted-foreground hover:text-primary hover:bg-muted"
            aria-label="Open link in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        <Badge className={`${typeClass} px-3 py-1 text-xs font-semibold`}>
          {capitalize(data.type)}
        </Badge>
      </div>
    </motion.div>
  );
};
