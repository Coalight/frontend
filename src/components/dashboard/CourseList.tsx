"use client";

import { CourseCard } from "./CourseCard";

interface CourseListProps {
  courses: Array<{
    id: number;
    code: string;
    title: string;
    instructor: string;
    studentsEnrolled: number;
    color: string;
  }>;
}

export const CourseList = ({ courses }: CourseListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {courses.map((course) => (
      <CourseCard key={course.id} course={course} />
    ))}
  </div>
);
