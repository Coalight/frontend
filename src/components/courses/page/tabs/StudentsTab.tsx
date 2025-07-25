/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "@/types/course";

export function StudentsTab({ course }: { course: Course }) {
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Student list will appear here
        </p>
      </div>
    </div>
  );
}
