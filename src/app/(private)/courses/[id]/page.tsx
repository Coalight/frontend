"use client";

import { selectCourses } from "@/redux/features/courses/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/components/basic/Loading";
import CoursePageRoot from "@/components/courses/page/CoursePageRoot";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string; 
  const courses = useAppSelector(selectCourses);
  const course = courses?.find((c) => c.id === courseId);

 useEffect(() => {
    if (!course) {
      router.replace("/not-found"); 
    }
  }, [course, router]);

  if (!course) {
    return <Loading />; 
  }

  return <CoursePageRoot course={course} />;
}