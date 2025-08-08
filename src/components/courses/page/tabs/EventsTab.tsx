/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventCard } from "@/components/events/EventCard";
import { Course } from "@/types/course";
import { CourseEvent } from "@/types/event";
import { FileIcon } from "lucide-react";

const events: CourseEvent[] = [
  // Assignments
  {
    id: "1",
    title: "Assignment 1",
    date: "2023-10-01",
    time: "10:00 AM",
    type: "assignment",
    courseCode: "CSE-101",
    courseId: "course-123",
    updatedAt: "2023-09-25T12:00:00Z",
  },
  {
    id: "2",
    title: "Assignment 2",
    date: "2023-10-15",
    time: "2:00 PM",
    type: "assignment",
    courseCode: "CSE-101",
    courseId: "course-123",
    updatedAt: "2023-09-26T12:00:00Z",
  },
  // Exam (Class Test)
  {
    id: "3",
    title: "Class Test 1",
    date: "2023-10-20",
    time: "11:00 AM",
    type: "exam",
    courseCode: "CSE-101",
    courseId: "course-123",
    updatedAt: "2023-09-28T12:00:00Z",
  },
  // Presentation
  {
    id: "4",
    title: "Group Presentation",
    date: "2023-11-05",
    time: "3:00 PM",
    type: "presentation",
    courseCode: "CSE-101",
    courseId: "course-123",
    updatedAt: "2023-09-29T12:00:00Z",
  },
  // Project
  {
    id: "5",
    title: "Final Project Submission",
    date: "2023-11-20",
    time: "5:00 PM",
    type: "project",
    courseCode: "CSE-101",
    courseId: "course-123",
    updatedAt: "2023-09-30T12:00:00Z",
  },
];

export function EventsTab({ course }: { course: Course }) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center  ">
        <div className="space-y-4 w-full">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} data={event} hideCourseCode />
            ))
          ) : (
            <FallBackAssignmentsTab />
          )}
        </div>
      </div>
    </div>
  );
}

function FallBackAssignmentsTab() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-gray-400 dark:text-gray-500">
        <FileIcon className="h-8 w-8" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Assignments will appear here
      </p>
    </div>
  );
}
