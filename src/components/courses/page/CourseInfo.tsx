import { motion } from "framer-motion";
import { Course } from "@/types/course";
import { cn } from "@/lib/utils";

export function CourseInfo({ course }: { course: Course }) {
//   const formatDays = (days: string[]) => {
//     const dayMap: Record<string, string> = {
//       mon: 'Monday',
//       tue: 'Tuesday',
//       wed: 'Wednesday',
//       thu: 'Thursday',
//       fri: 'Friday',
//       sat: 'Saturday',
//       sun: 'Sunday'
//     };
//     return days.map(day => dayMap[day]).join(', ');
//   };
console.log(course.class_days);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",
        "bg-white dark:bg-gray-800 rounded-lg shadow p-6",
        "border border-gray-200 dark:border-gray-700"
      )}
    >
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Course Code</h3>
        <p className="text-lg font-semibold dark:text-white">{course.code}</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Instructor</h3>
        <p className="text-lg font-semibold dark:text-white">
          {course.instructor?.name || 'Not assigned'}
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Class Days</h3>
        <p className="text-lg font-semibold dark:text-white">
          {/* { course.class_days.join(", ") } */}
          Saturdayy 
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Credits</h3>
        <p className="text-lg font-semibold dark:text-white">{course.credits}</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</h3>
        <p className="text-lg font-semibold dark:text-white">{course.total_students}</p>
      </div>
    </motion.div>
  );
}