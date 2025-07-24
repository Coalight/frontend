import { motion } from "framer-motion";
import { TabType, Course } from "@/types/course";
import { cn } from "@/lib/utils";

export function TabContent({ tab, course }: { tab: TabType; course: Course }) {
  const content = {
    stream: (
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
    ),
    students: (
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
    ),
    instructors: (
      <div className="space-y-4">
        {course.instructor ? (
          <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                <span className="text-lg font-medium text-blue-600 dark:text-blue-300">
                  {course.instructor.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium truncate">
                {course.instructor.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {course.instructor.email}
              </p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    ),
    assignments: (
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
    ),
    about: (
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {course.description || "No description available"}
        </p>
      </div>
    ),
  };

  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-lg p-6 flex flex-col space-y-4 justify-around items-center",
        "bg-background text-foreground"
      )}
    >
      {content[tab]}
    </motion.div>
  );
}
