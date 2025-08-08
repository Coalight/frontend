import { CourseAsset } from "./assets";

export type EventType =
  | "exam"
  | "lecture"
  | "deadline"
  | "other"
  | "meeting"
  | "workshop"
  | "assignment"
  | "project"
  | "presentation"
  | "discussion"
  | "announcement"
  | "resource"
  | "reading"
  | "quiz"
  | "test"
  | "lab"
  | "tutorial";

export interface CourseEvent {
  id: string | number;
  title: string;
  date: string;
  time: string;
  type: EventType;
  courseCode: string;
  courseId?: string;
  updatedAt: string;
  url?: string;
  description?: string;
}

export interface EventCardProps {
  data: CourseEvent | CourseAsset;
  hideCourseCode?: boolean;
}
