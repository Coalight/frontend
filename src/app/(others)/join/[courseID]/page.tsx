"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { addNewEnrolledCourse } from "@/redux/features/courses/coursesSlice";

export default function CourseJoinPage() {
  const { courseID } = useParams<{ courseID: string }>();
  const searchParams = useSearchParams();
  const courseCode = searchParams.get("code") || "";
  const router = useRouter();
  const [code, setCode] = useState(courseCode);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Joining code is required");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`/api/courses/join/${courseID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to join course");
        return;
      }

      const data = await response.json();
      const { course } = data;

      dispatch(addNewEnrolledCourse(course));

      toast.success("Course joined successfully!");
      router.push(`/courses/${courseID}`);
    } catch (error) {
      console.error("Error joining course:", error);
      toast.error("An error occurred while joining the course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900">
      {/* Monochrome background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neutral-200/30 dark:bg-neutral-800/30 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl" />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="relative">
            {/* Glass card */}
            <div className="relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/30 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 dark:from-neutral-800/20 dark:to-neutral-800/10" />

              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
                  >
                    Join Course
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 text-neutral-600 dark:text-neutral-400"
                  >
                    Enter the code provided by your instructor
                  </motion.p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  spellCheck="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Course ID
                    </label>
                    <div className="w-full px-4 py-3 bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 backdrop-blur-sm">
                      {courseID}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Joining Code
                    </label>
                    <motion.div
                      animate={{
                        borderColor: isFocused
                          ? "hsl(0, 0%, 40%)"
                          : "hsl(0, 0%, 80%)",
                        boxShadow: isFocused
                          ? "0 0 0 3px hsl(0, 0%, 90%)"
                          : "none",
                      }}
                      transition={{ duration: 0.2 }}
                      className="relative rounded-lg overflow-hidden"
                    >
                      <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3 bg-white/90 dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-0 text-neutral-900 dark:text-neutral-100 backdrop-blur-sm"
                        autoFocus
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="w-full py-3 px-6 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Now</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Subtle floating animation for the card */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute inset-0 -z-10 bg-neutral-400/10 dark:bg-neutral-600/10 blur-lg rounded-2xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
