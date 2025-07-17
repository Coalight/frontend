"use client";

import { motion } from "framer-motion";
import { BookOpen, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

const MAX_DESCRIPTION_LENGTH = 100;

const iconColors = [
  "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
];

const randomIconColor = () => {
  return iconColors[Math.floor(Math.random() * iconColors.length)];
};

export const CourseCard = ({ 
  course
}: CourseCardProps) => {
  const truncatedDescription = course.description.length > MAX_DESCRIPTION_LENGTH - 3
      ? `${course.description.substring(0, MAX_DESCRIPTION_LENGTH - 3)}...`
      : course.description;

  return (
    <Link href={`/courses/${course.id}`} passHref>
      <motion.div
        transition={{ type: "tween", duration: 0.5, ease: "linear" }}
        className="group rounded-xl border p-5 transition-all hover:shadow-md hover:border-primary/30 cursor-pointer bg-background "
      >
        <div className="flex flex-col h-full">
          {/* Header with icon and course code */}
          <div className="flex justify-between items-start mb-3">
        <div className={`p-4 rounded-lg ${randomIconColor()}`}>
          <BookOpen className="h-6 w-6" />
        </div>
        <Badge variant="outline" className="text-sm font-medium">
          {course.code}
        </Badge>
          </div>
          
          {/* Course title and description */}
          <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {truncatedDescription}
        </p>
          </div>
          
          {/* Footer with instructor and student count */}
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{course.total_students} students</span>
            </div>
            <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{course.credits} credits</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};