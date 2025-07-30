/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "@/types/course";

export function DiscussionsTab({ course }: { course: Course }) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center  ">
        <div className="space-y-4 w-full">
          <FallBackDiscussionsTab />
        </div>
      </div>
    </div>
  );
}

function FallBackDiscussionsTab() {
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Discussions will appear here
      </p>
    </div>
  );
}
