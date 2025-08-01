import { motion } from "framer-motion";
import { Course } from "@/types/course";
import { BookOpen, CalendarDays, Star } from "lucide-react";
import { GradientLine2 } from "@/components/ui/GradientLine2";
import { DayOfWeek } from "@/types/course";
import { cn } from "@/lib/utils";
import { HeaderAction } from "./HeaderAction";
import { CourseJoiningLink } from "./CourseJoiningLink";
export function CourseHeader({ course }: { course: Course }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full text-center mb-8 relative "
    >
      {/* Main Header */}

      <CourseHeaderContent>
        <div className="relative w-full">
          <CourseTitle title={course.title} />
          <HeaderAction />
        </div>

        <CourseHeaderMacro>
          <CourseCode courseCode={course.code} />
          <CourseCredits credits={course.credits} />
          <CourseSchedule schedule={course.class_days} />
        </CourseHeaderMacro>
      </CourseHeaderContent>

      {/* joining link */}

      <CourseJoiningLink
        courseId={course.id}
        joiningCode={course.joining_code}
      />

      {/* settings btn  */}

      {/* GradientLine component */}
      <GradientLine2 className="mt-8 pb-5" />
    </motion.div>
  );
}

function CourseCode({ courseCode }: { courseCode: number | string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full 
               bg-blue-100/40 dark:bg-blue-900/20 backdrop-blur-sm
               border border-blue-200/50 dark:border-blue-800/30
               hover:bg-blue-100/60 dark:hover:bg-blue-900/30 transition-colors"
    >
      <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      <span className="text-sm font-medium">
        <span className="text-blue-700/80 dark:text-blue-200/80">Code:</span>
        <span className="text-blue-900 dark:text-blue-100 ml-1 font-semibold">
          {courseCode}
        </span>
      </span>
    </div>
  );
}

function CourseCredits({ credits }: { credits: number | string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full 
               bg-amber-100/40 dark:bg-amber-900/20 backdrop-blur-sm
               border border-amber-200/50 dark:border-amber-800/30"
    >
      <Star className="h-4 w-4 text-amber-500 dark:text-amber-300" />
      <span className="text-sm font-medium">
        <span className="text-amber-700/80 dark:text-amber-200/80">
          Credits:
        </span>
        <span className="text-amber-900 dark:text-amber-100 ml-1">
          {credits}
        </span>
      </span>
    </div>
  );
}

function CourseSchedule({ schedule }: { schedule: DayOfWeek[] }) {
  return (
    schedule.length > 0 && (
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full
                 bg-emerald-100/40 dark:bg-emerald-900/20 backdrop-blur-sm
                 border border-emerald-200/50 dark:border-emerald-800/30
                 group relative overflow-hidden"
      >
        <CalendarDays className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
        <div className="flex gap-1">
          {schedule.map((day) => (
            <span
              key={day}
              className="text-sm font-medium px-2 py-0.5 rounded-md
                   bg-emerald-200/30 dark:bg-emerald-800/30
                   text-emerald-900 dark:text-emerald-100
                   hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50
                   transition-colors duration-200"
            >
              {day.slice(0, 3).toUpperCase()}
            </span>
          ))}
        </div>
        {/* Animated underline effect */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 dark:bg-emerald-500 
                    w-0 group-hover:w-full transition-all duration-300 origin-left"
        />
      </div>
    )
  );
}

function CourseHeaderContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 mb-6">
      {children}
    </div>
  );
}

function CourseHeaderMacro({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center mt-4  gap-3">{children}</div>;
}

function CourseTitle({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <motion.h1
        className={cn(
          "text-3xl md:text-4xl font-bold",
          "bg-gradient-to-r from-gray-800 to-emerald-400 dark:from-gray-100 dark:to-emerald-300",
          "bg-clip-text text-transparent",
          "hover:to-emerald-500 dark:hover:to-emerald-400 transition-colors duration-500"
        )}
        whileHover={{
          backgroundPosition: "right center",
          transition: { duration: 1.5 },
        }}
      >
        {title}
      </motion.h1>

      {/* Subtle floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-emerald-300/30 dark:text-emerald-400/20"
            initial={{
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 40 - 20,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 40 - 20,
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              fontSize: `${Math.random() * 10 + 8}px`,
              zIndex: -1,
            }}
          >
            •
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
