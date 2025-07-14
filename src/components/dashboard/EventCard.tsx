"use client";

import { motion } from "framer-motion";
import { Flag, GraduationCap, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatShortDate, formatTimeSince } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}
export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "exam" | "lecture" | "deadline";
  course: string;
  updatedAt: string;
}
export const EventCard = ({ event }: EventCardProps) => {
  const eventTypeClasses = {
    exam: "bg-red-500/10 text-red-500",
    lecture: "bg-blue-500/10 text-blue-500",
    deadline: "bg-violet-500/10 text-violet-500",
  };

  const eventIcons = {
    exam: <Flag className="h-4 w-4" />,
    lecture: <GraduationCap className="h-4 w-4" />,
    deadline: <Bookmark className="h-4 w-4" />,
  };

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="p-3 rounded-lg border flex items-center gap-3 hover:bg-muted/50"
    >
      <div className={`p-2 rounded-full ${eventTypeClasses[event.type]}`}>
        {eventIcons[event.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{event.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{event.course}</Badge>
          <span className="text-xs text-muted-foreground">
            {formatShortDate(event.date)} • {event.time}
          </span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">
        {formatTimeSince(event.updatedAt)}
      </span>
    </motion.div>
  );
};
