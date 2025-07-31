export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface Course {
  id: string;
  title: string;
  code: string;
  created_by: string;
  created_at: Date | string; // Date object and ISO string
  description: string;
  credits: string;
  start_date: number | string; // Unix timestamp (number) or string representation
  class_days: DayOfWeek[];
  total_students: number;

  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  currentUserRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MODERATOR";
  totalStudents?: number;

  Peoples?: EnrolledPeople[];
  Events?: CourseEvent[];
}

export type TabType =
  | "about"
  | "stream"
  | "peoples"
  | "events"
  | "assets"
  | "discussions";

export interface EnrolledPeople {
  id: string;
  user_id: string;
  course_id: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MODERATOR";
  enrolled_at: Date | string; // Date object and ISO string
  user_name: string;
  user_email: string;
}
export interface CourseEvent {
  id: string;
  course_id: string;
  title: string;
  description: string;
  start_time: Date | string; // Date object and ISO string
  end_time: Date | string; // Date object and ISO string
  created_at: Date | string; // Date object and ISO string
  created_by: string;
}
