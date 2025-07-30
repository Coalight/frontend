/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventCard } from "@/components/events/EventCard";
import { Course } from "@/types/course";
import { Event } from "@/types/event";

const events: Event[] = [
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
              <EventCard key={event.id} event={event} hideCourseCode />
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
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Assignments will appear here
      </p>
    </div>
  );
}
