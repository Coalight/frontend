"use client";

import { motion } from "framer-motion";
import { BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: {
    id: number;
    code: string;
    title: string;
    instructor: string;
    studentsEnrolled: number;
    color: string;
  };
}

export const CourseCard = ({ course }: CourseCardProps) => (
  <Link href={`/courses/${course.id}`} passHref>
    <motion.div
      whileHover={{ y: -2 }}
      className="group rounded-lg border p-4 transition-all hover:shadow-sm hover:border-primary/50 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-md ${course.color} bg-secondary`}>
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{course.title}</h3>
            <Badge variant="secondary">{course.code}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Instructor: {course.instructor}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{course.studentsEnrolled} students</span>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);
