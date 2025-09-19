"use client";

import { GraduationCap, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types/course";
import { MagicCard } from "../ui/magic-card";

interface CourseCardProps {
  course: Course;
}

const MAX_DESCRIPTION_LENGTH = 100;

export const CourseCard = ({ course }: CourseCardProps) => {
  const truncatedDescription =
    course.description.length > MAX_DESCRIPTION_LENGTH - 3
      ? `${course.description.substring(0, MAX_DESCRIPTION_LENGTH - 3)}...`
      : course.description;

  return (
    <Link href={`/courses/${course.id}`} passHref>
      <MagicCard className="rounded-xl">
        <div className="group rounded-xl border p-5 transition-all hover:shadow-md hover:border-primary/30 cursor-pointer bg-transparent ">
          <div className="flex flex-col h-full">
            {/* Header with icon and course code */}
            <div className="flex justify-between items-start mb-3">
              <div className={`p-4 rounded-full bg-primary/10 text-primary`}>
                <GraduationCap className="h-6 w-6" />
              </div>
              <Badge
                variant="outline"
                className="text-sm font-medium rounded-full px-3 py-1"
              >
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
                <Sparkles className="h-4 w-4 mr-1" />
                <span>{course.credits} credits</span>
              </div>
            </div>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
};
