import { Course } from "@/types/course";

interface AboutTabProps {
  course: Course;
}

export function AboutTab({ course }: AboutTabProps) {
  const { description } = course || {};
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pt-0  space-y-6">
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          {description || "No description available for this course."}
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors">
          Contact Instructor
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
          Get Help
        </button>
        <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors">
          Report Issue
        </button>
      </div>
    </div>
  );
}
