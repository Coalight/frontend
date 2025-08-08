export type CourseAssetsType =
  | "assets"
  | "slide"
  | "file"
  | "sheet"
  | "link"
  | "video"
  | "audio"
  | "other";

export interface CourseAsset {
  id: string | number;
  title: string;
  date: string;
  time: string;
  type: CourseAssetsType;
  courseCode: string;
  courseId?: string;
  updatedAt: string;
  url?: string;
  description?: string;
}
