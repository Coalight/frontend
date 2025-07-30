"use client";

import { motion } from "framer-motion";
import {
  Flag,
  GraduationCap,
  Bookmark,
  Calendar,
  MessageSquare,
  FileText,
  Users,
  Mic2,
  AlertCircle,
  Link,
  Video,
  ListMusic as Audio,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatShortDate, formatTimeSince } from "@/lib/utils";
import { ReactNode } from "react";
import { EventCardProps, EventType } from "@/types/event";

export const EventCard = ({
  event,
  hideCourseCode = false,
}: EventCardProps) => {
  const eventTypeClasses: Record<EventType, string> = {
    exam: "bg-red-500/10 text-red-500",
    lecture: "bg-blue-500/10 text-blue-500",
    deadline: "bg-violet-500/10 text-violet-500",
    other: "bg-gray-500/10 text-gray-500",
    meeting: "bg-green-500/10 text-green-500",
    workshop: "bg-yellow-500/10 text-yellow-500",
    assignment: "bg-orange-500/10 text-orange-500",
    project: "bg-purple-500/10 text-purple-500",
    presentation: "bg-pink-500/10 text-pink-500",
    discussion: "bg-cyan-500/10 text-cyan-500",
    assets: "bg-amber-500/10 text-amber-500",
    announcement: "bg-indigo-500/10 text-indigo-500",
    slide: "bg-teal-500/10 text-teal-500",
    sheet: "bg-lime-500/10 text-lime-500",
    link: "bg-gray-200/10 text-sky-600",
    video: "bg-gray-200/10 text-red-600",
    audio: "bg-blue-200/10 text-blue-700",
    resource: "bg-green-200/10 text-green-700",
    reading: "bg-yellow-200/10 text-yellow-700",
    quiz: "bg-pink-200/10 text-pink-700",
    test: "bg-red-200/10 text-red-700",
    lab: "bg-gray-300/10 text-gray-800",
    tutorial: "bg-blue-300/10 text-blue-800",
    file: "bg-gray-400/10 text-yellow-300",
  };

  const eventIcons: Record<EventType, ReactNode> = {
    exam: <Flag className="h-4 w-4" />,
    lecture: <GraduationCap className="h-4 w-4" />,
    deadline: <Bookmark className="h-4 w-4" />,
    other: <Calendar className="h-4 w-4" />,
    meeting: <Users className="h-4 w-4" />,
    workshop: <Calendar className="h-4 w-4" />,
    assignment: <FileText className="h-4 w-4" />,
    project: <FileText className="h-4 w-4" />,
    presentation: <Mic2 className="h-4 w-4" />,
    discussion: <MessageSquare className="h-4 w-4" />,
    assets: <Bookmark className="h-4 w-4" />,
    announcement: <AlertCircle className="h-4 w-4" />,
    slide: <FileText className="h-4 w-4" />,
    sheet: <FileText className="h-4 w-4" />,
    link: <Link className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    audio: <Audio className="h-4 w-4" />,
    resource: <FileText className="h-4 w-4" />,
    reading: <FileText className="h-4 w-4" />,
    quiz: <FileText className="h-4 w-4" />,
    test: <FileText className="h-4 w-4" />,
    lab: <FileText className="h-4 w-4" />,
    tutorial: <FileText className="h-4 w-4" />,
    file: <FileText className="h-4 w-4" />,
  };

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="p-3 rounded-md border flex items-center gap-3 hover:bg-muted/50 max-w-4xl mx-auto   cursor-pointer"
    >
      <div className={`p-2 rounded-full ${eventTypeClasses[event.type]}`}>
        {eventIcons[event.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{event.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {!hideCourseCode && (
            <Badge variant="outline">{event.courseCode}</Badge>
          )}
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
