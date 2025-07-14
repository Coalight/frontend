/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormHeader } from "./FormHeader";
import { FormField } from "./FormField";
import { DatePickerField } from "./DatePickerField";
import { DaySelectionField } from "./DaySelectionField";
import { SubmitButton } from "./SubmitButton";
import { CourseCreationFormData, CourseCreationFormError } from "@/types/form";
import { validateForm } from "./utils";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { createNewCourse } from "@/redux/features/courses/coursesSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DAYS_OF_WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function CourseForm({
  close,
  className,
}: {
  close: () => void;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<CourseCreationFormData>({
    title: "",
    code: "",
    description: "",
    schedule: [],
    credits: 3,
    maxStudents: 30,
    startDateInUnixTime: Date.now(),
    isInstructor: false,
  });

  const [error, setError] = useState<CourseCreationFormError | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "maxStudents" ||
        name === "credits" ||
        name == "startDateInUnixTime"
          ? parseFloat(value) || 0
          : value,
    }));
    if (error?.field === name) {
      setError(null);
    }
  };

  const toggleDaySelection = (day: string) => {
    setFormData((prev) => {
      const newSchedule = prev.schedule.includes(day)
        ? prev.schedule.filter((d) => d !== day)
        : [...prev.schedule, day];
      return { ...prev, schedule: newSchedule };
    });
    if (error?.field === "schedule") {
      setError(null);
    }
  };

  const handleDateChange = (date: number) => {
    setFormData((prev) => ({ ...prev, startDateInUnixTime: date }));
    if (error?.field === "startDateInUnixTime") {
      setError(null);
    }
  };

  const handleCheckBox = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isInstructor: checked,
    }));
    if (error?.field === "isInstructor") {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataCopy = { ...formData, code: formData.code.toUpperCase() };
    const validationError = validateForm(formDataCopy);
    if (validationError) {
      setError(validationError);
      toast.error(validationError.message);
      return;
    }

    // console.log("Submitting:", formDataCopy);
    dispatch(createNewCourse(formDataCopy));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "w-full h-full mx-auto p-6 rounded-md bg-card shadow-sm ",
        className
      )}
    >
      <FormHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Course Title" id="title" className="md:col-span-2">
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Database Management Systems"
            />
          </FormField>

          <FormField label="Course Code" id="code">
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="CS-101"
            />
          </FormField>

          <FormField label="Credits" id="credits">
            <Input
              id="credits"
              name="credits"
              type="number"
              step="0.5"
              min="0.5"
              max="10"
              value={formData.credits}
              onChange={handleChange}
            />
          </FormField>

          {/* Start Date */}
          <FormField label="Start Date">
            <DatePickerField
              value={formData.startDateInUnixTime}
              onChange={handleDateChange}
            />
          </FormField>

          <FormField label="Max Students" id="maxStudents">
            <Input
              id="maxStudents"
              name="maxStudents"
              type="number"
              min="1"
              max="200"
              value={formData.maxStudents}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Class Days">
          <DaySelectionField
            selectedDays={formData.schedule}
            onToggleDay={toggleDaySelection}
          />
        </FormField>

        <FormField label="Instructor Role" id="instructor">
          <div className="flex items-center gap-3">
            <Checkbox
              id="instructor"
              checked={formData.isInstructor}
              onCheckedChange={handleCheckBox}
            />
            <Label htmlFor="instructor">
              <span className="dark:text-gray-300">
                I&apos;m the instructor of this course.
              </span>
            </Label>
          </div>
        </FormField>

        {/* Description */}
        <FormField label="Course Description" id="description">
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={cn(
              "w-full min-h-[120px] transition-all duration-300 resize-none border-border focus:ring-primary"
            )}
            placeholder="Course objectives, learning outcomes, and topics covered..."
          />
        </FormField>

        <div className="flex justify-end gap-4 pt-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outline" type="button" onClick={close}>
              Cancel
            </Button>
          </motion.div>
          <SubmitButton />
        </div>
      </form>
    </motion.div>
  );
}
