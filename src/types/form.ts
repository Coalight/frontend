export type CourseCreationFormData = {
  title: string;
  code: string;
  description: string;
  startDateInUnixTime: number;
  schedule: string[];
  credits: number;
  maxStudents: number;
  isInstructor: boolean; // is current user is the course instructor
};

export type CourseCreationFormError = {
  field: keyof CourseCreationFormData;
  message: string;
};
