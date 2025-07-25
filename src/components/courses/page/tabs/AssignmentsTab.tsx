/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "@/types/course";

export function AssignmentsTab({ course }: { course: Course }) {
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
    </div>
  );
}
