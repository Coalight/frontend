/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "@/types/course";
import { Event } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";

const assets: Event[] = [
  {
    id: "1",
    title: "Lecture 1 Audio",
    date: "2024-06-01",
    time: "10:00",
    type: "audio",
    courseCode: "CS101",
    updatedAt: new Date().toISOString(),
    url: "https://example.com/audio/lecture1.mp3",
    description: "Audio recording of Lecture 1",
  },
  {
    id: "2",
    title: "Lecture 2 Video",
    date: "2024-06-02",
    time: "14:00",
    type: "video",
    courseCode: "CS101",
    updatedAt: new Date().toISOString(),
    url: "https://example.com/video/lecture2.mp4",
    description: "Video recording of Lecture 2",
  },
  {
    id: "3",
    title: "Reference Material",
    date: "2024-06-03",
    time: "09:30",
    type: "link",
    courseCode: "CS101",
    updatedAt: new Date().toISOString(),
    url: "https://example.com/reference",
    description: "External reference for the course",
  },
  {
    id: "4",
    title: "Assignment PDF",
    date: "2024-06-04",
    time: "16:00",
    type: "file",
    courseCode: "CS101",
    updatedAt: new Date().toISOString(),
    url: "https://example.com/files/assignment1.pdf",
    description: "Assignment 1 PDF file",
  },
];
export function AssetsTab({ course }: { course: Course }) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center  ">
        <div className="space-y-4 w-full">
          {assets.length > 0 ? (
            assets.map((asset) => (
              <EventCard key={asset.id} event={asset} hideCourseCode />
            ))
          ) : (
            <FallBackAssets />
          )}
        </div>
      </div>
    </div>
  );
}

function FallBackAssets() {
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
            <rect
              x="3"
              y="7"
              width="18"
              height="13"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Recent assets and activity will appear here
        </p>
      </div>
    </div>
  );
}
