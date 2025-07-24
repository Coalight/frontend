"use client";

import { Course, TabType } from "@/types/course";
import { useState } from "react";
import {
  CourseHeader,
  TabContent,
  CourseTabs,
} from "@/components/courses/page";

export default function CoursePageRoot({ course }: { course: Course | null }) {
  const [activeTab, setActiveTab] = useState<TabType>("stream");

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Course not found</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8">
      <CourseHeader course={course} />
      <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent tab={activeTab} course={course} />
    </div>
  );
}
