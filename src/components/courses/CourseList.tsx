"use client";

import { CourseCard } from "./CourseCard";
import { useAppSelector } from "@/redux/hooks";
import { selectCourseFetchStatus, selectCourses } from "@/redux/features/courses/selectors";
import { Skeleton } from "../ui/skeleton";


export function  CourseList(){
  const courses = useAppSelector(selectCourses);
  const status = useAppSelector(selectCourseFetchStatus);
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {courses && courses.length > 0 && courses.map((course) => (
      <CourseCard key={course.id} course={course} />
    ))}
    {status === "LOADING" && (
      Array.from({ length: 4 }).map((_, i) => (
       <Skeleton className="h-32 w-full rounded-lg" key={i} />
      ))
    )}
  </div>
  )}
