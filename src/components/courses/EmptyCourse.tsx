import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const EmptyCourses = () => (
  <motion.div
    className="lg:col-span-2 flex flex-col items-center justify-center py-12 text-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="mb-4 p-3 rounded-lg bg-transparent"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <BookOpen className="size-7 text-gray-600 dark:text-gray-300" />
    </motion.div>
    
    <h3 className="text-2xl font-[700] text-gray-800 dark:text-gray-200 mb-1">
      No Courses Found
    </h3>
    <p className="text-gray-500 dark:text-gray-400 text-xl font-[500]">
      You&apos;re not enrolled in any courses yet
    </p>
  </motion.div>
);