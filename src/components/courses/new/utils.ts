import { CourseCreationFormData, CourseCreationFormError } from "@/types/form";

export const validateForm = (
  formData: CourseCreationFormData
): CourseCreationFormError | null => {
  // Title validation
  if (!formData.title || formData.title.length < 3) {
    return { field: "title", message: "Title must be at least 3 characters" };
  }

  // Course code validation (simple format check)
  if (
    !formData.code ||
    formData.code.length > 10 ||
    !/^[A-Z0-9-]+$/.test(formData.code)
  ) {
    return {
      field: "code",
      message: "Invalid course code (e.g., like CSE-344)",
    };
  }

  // Credits validation
  if (formData.credits < 0.5 || formData.credits > 10) {
    return { field: "credits", message: "Credits must be between 0.5 and 10" };
  }

  // Start date validation
  if (
    !formData.startDateInUnixTime ||
    formData.startDateInUnixTime <
      new Date(new Date().setHours(0, 0, 0, 0)).getTime()
  ) {
    return {
      field: "startDateInUnixTime",
      message: "Start date must be today or in the future",
    };
  }

  // Max students validation
  if (formData.maxStudents < 1 || formData.maxStudents > 200) {
    return {
      field: "maxStudents",
      message: "Max students must be between 1 and 200",
    };
  }

  // Schedule validation
  if (!formData.schedule || formData.schedule.length === 0) {
    return { field: "schedule", message: "Schedule is required" };
  }

  // Description validation
  if (!formData.description || formData.description.length < 20) {
    return {
      field: "description",
      message: "Description must be at least 20 characters",
    };
  }

  return null;
};
