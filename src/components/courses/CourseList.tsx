"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectCourseFetchStatus, selectCourses } from "@/redux/features/courses/selectors";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyCourses , CourseCard} from "@/components/courses";


export function  CourseList(){
  const courses = useAppSelector(selectCourses);
  const status = useAppSelector(selectCourseFetchStatus);

  if(status === "SUCCESS" && (!courses || courses.length === 0) ) {
    return <EmptyCourses />;
  }
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
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
    </div>

  )}
