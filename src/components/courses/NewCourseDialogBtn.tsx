"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CourseForm } from "@/components/courses/new/CourseForm";
import { PlusCircle } from "lucide-react";
import { selectIsCourseCreationModalOpen } from "@/redux/features/courses/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsCourseCreationModalOpen } from "@/redux/features/courses/coursesSlice";
import Icons from "@/components/icons";

export function CreateCourseModal() {
  const isModalOpen = useAppSelector(selectIsCourseCreationModalOpen);
  const dispatch = useAppDispatch();

  const setOpen = (open: boolean) => {
    dispatch(setIsCourseCreationModalOpen(open));
  };

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <PlusCircle className="h-4 w-4" />
        Create Course
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md p-0 border-0"
            >
              <Button
                variant="ghost"
                className="size-10 rounded-full absolute top-1 right-1.5"
                onClick={() => setOpen(false)}
              >
                <Icons.close className="size-5 text-gray-400" />
              </Button>

              {/* // actual component */}
              <CourseForm close={() => setOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
