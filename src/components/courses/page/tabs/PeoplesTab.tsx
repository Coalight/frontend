/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "@/types/course";

export function PeoplesTab({ course }: { course: Course }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          No instructors assigned
        </p>
      </div>
    </div>
  );
}
