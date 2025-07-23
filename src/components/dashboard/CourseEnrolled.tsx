/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppDispatch } from "@/redux/hooks";
import { CourseList } from "@/components/courses";
import { useEffect } from "react";
import { getEnrolledCourses } from "@/redux/features/courses/coursesSlice";

export function CourseEnrolled() {

const dispatch = useAppDispatch();

useEffect(() => {
    dispatch(getEnrolledCourses());
  }, []);
   

  return <CourseList />;
}