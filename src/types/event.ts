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
  | "assets"
  | "announcement"
  | "slide"
  | "file"
  | "sheet"
  | "link"
  | "video"
  | "audio"
  | "resource"
  | "reading"
  | "quiz"
  | "test"
  | "lab"
  | "tutorial";

export interface Event {
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
  event: Event;
  hideCourseCode?: boolean;
}
