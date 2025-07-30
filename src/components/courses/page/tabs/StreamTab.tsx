/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "@/types/course";
import { Event } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";
const streams: Event[] = [
  {
    id: 1,
    title: "Midterm Exam",
    date: "2024-07-05",
    time: "10:00 AM",
    type: "exam",
    courseCode: "Math 101",
    updatedAt: "2024-06-20T08:00:00Z",
  },
  {
    id: 2,
    title: "Guest Lecture: History of Art",
    date: "2024-07-08",
    time: "2:00 PM",
    type: "lecture",
    courseCode: "History 201",
    updatedAt: "2024-06-19T15:30:00Z",
  },
  {
    id: 3,
    title: "Project Deadline",
    date: "2024-07-12",
    time: "11:59 PM",
    type: "deadline",
    courseCode: "Physics 301",
    updatedAt: "2024-06-18T12:00:00Z",
  },
  {
    id: 4,
    title: "Team Meeting",
    date: "2024-07-10",
    time: "3:00 PM",
    type: "meeting",
    courseCode: "CS 401",
    updatedAt: "2024-06-17T10:00:00Z",
  },
  {
    id: 5,
    title: "Workshop on Data Science",
    date: "2024-07-15",
    time: "1:00 PM",
    type: "workshop",
    courseCode: "Data Sci 101",
    updatedAt: "2024-06-16T09:30:00Z",
  },
  {
    id: 6,
    title: "Assignment Submission",
    date: "2024-07-20",
    time: "5:00 PM",
    type: "assignment",
    courseCode: "Chemistry 201",
    updatedAt: "2024-06-15T14:45:00Z",
  },
  {
    id: 7,
    title: "Project Presentation",
    date: "2024-07-25",
    time: "10:00 AM",
    type: "presentation",
    courseCode: "Biology 301",
    updatedAt: "2024-06-14T11:00:00Z",
  },
  {
    id: 8,
    title: "Discussion Session",
    date: "2024-07-30",
    time: "4:00 PM",
    type: "discussion",
    courseCode: "Philosophy 101",
    updatedAt: "2024-06-13T13:30:00Z",
  },
  {
    id: 9,
    title: "Asset Management Seminar",
    date: "2024-08-01",
    time: "9:00 AM",
    type: "assets",
    courseCode: "Finance 201",
    updatedAt: "2024-06-12T16:00:00Z",
  },
  {
    id: 10,
    title: "Course Announcement",
    date: "2024-08-05",
    time: "12:00 PM",
    type: "announcement",
    courseCode: "English 101",
    updatedAt: "2024-06-11T18:15:00Z",
  },
];
export function StreamTab({ course }: { course: Course }) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center  ">
        <div className="space-y-4 w-full">
          {streams.length > 0 ? (
            streams.map((stream) => (
              <EventCard key={stream.id} event={stream} hideCourseCode />
            ))
          ) : (
            <FallBackStream />
          )}
        </div>
      </div>
    </div>
  );
}

function FallBackStream() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Recent announcements and activity will appear here
        </p>
      </div>
    </div>
  );
}
