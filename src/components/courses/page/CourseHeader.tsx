import { motion } from "framer-motion";
import { Course } from "@/types/course";
import { cn } from "@/lib/utils"; 

export function CourseHeader({ course }: { course: Course }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative w-full rounded-lg overflow-hidden shadow-lg",
        "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800",
        "text-white p-6 md:p-8 mb-6"
      )}
    >
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
      <div className="relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-lg md:text-xl opacity-90">{course.description}</p>
      </div>
    </motion.div>
  );
}