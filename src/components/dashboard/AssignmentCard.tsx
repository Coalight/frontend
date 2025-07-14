"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatShortDate, formatTimeSince } from "@/lib/utils";

interface AssignmentCardProps {
  assignment: Assignment;
}

export interface Assignment {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  updatedAt: string;
}

export const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  const priorityClasses = {
    high: "bg-red-500/10 text-red-500",
    medium: "bg-amber-500/10 text-amber-500",
    low: "bg-emerald-500/10 text-emerald-500",
  };

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="p-3 rounded-lg border flex items-center justify-between hover:bg-muted/50"
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${priorityClasses[assignment.priority]}`}
        >
          <FileText className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">{assignment.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{assignment.course}</Badge>
            <span className="text-xs text-muted-foreground">
              Due {formatShortDate(assignment.dueDate)}
            </span>
          </div>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">
        {formatTimeSince(assignment.updatedAt)}
      </span>
    </motion.div>
  );
};
