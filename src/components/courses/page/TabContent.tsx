import { motion } from "framer-motion";
import { TabType, Course } from "@/types/course";

export function TabContent({ tab, course }: { tab: TabType; course: Course }) {
  const content = {
    main: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
        <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
      </div>
    ),
    stream: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Stream</h2>
        <p className="text-gray-700 dark:text-gray-300">Recent announcements and activity will appear here.</p>
      </div>
    ),
    students: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Students ({course.total_students})</h2>
        <p className="text-gray-700 dark:text-gray-300">Student list will appear here.</p>
      </div>
    ),
    instructors: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Instructors</h2>
        {course.instructor ? (
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300 font-medium">
                {course.instructor.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{course.instructor.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No instructors assigned</p>
        )}
      </div>
    ),
    assignments: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Assignments</h2>
        <p className="text-gray-700 dark:text-gray-300">Assignments will appear here.</p>
      </div>
    ),
  };

  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700"
    >
      {content[tab]}
    </motion.div>
  );
}