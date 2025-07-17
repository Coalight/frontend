"use client";

import { useAppDispatch } from "@/redux/hooks";
import { CourseList } from "@/components/courses";
import { useEffect } from "react";
import { getEnrolledCourses } from "@/redux/features/courses/coursesSlice";

export function CourseEnrolled() {

const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getEnrolledCourses());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
    

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <CourseList />
      
    </div>
  );
}