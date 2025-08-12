// Backend integration types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

// User and Role types for backend integration
export interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "instructor" | "moderator" | "student";
  permissions: string[];
  courseIds: string[];
}

// Asset upload payload types
export interface AssetUploadPayload {
  title: string;
  description?: string;
  type: import("@/types/assets").CourseAssetsType;
  courseId: string;
  date: string;
  time: string;
  url?: string;
}

export interface FileUploadFormData extends FormData {
  append(name: "file", value: File): void;
  append(name: "title", value: string): void;
  append(name: "description", value: string): void;
  append(name: "type", value: import("@/types/assets").CourseAssetsType): void;
  append(name: "courseId", value: string): void;
  append(name: "date", value: string): void;
  append(name: "time", value: string): void;
}

// Asset response from backend
export interface BackendAsset {
  id: string | number;
  title: string;
  description?: string;
  type: import("@/types/assets").CourseAssetsType;
  date: string;
  time: string;
  courseCode: string;
  courseId: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  fileSize?: number;
  fileName?: string;
  fileType?: string;
  uploadedBy: string;
  uploadedByName: string;
}

// API endpoints configuration
export const API_ENDPOINTS = {
  // User endpoints
  USER: "/api/user",

  // Asset endpoints
  ASSETS: "/api/courses/assets",
  ASSET_BY_ID: (id: string | number) => `/api/courses/assets/${id}`,

  // Course endpoints
  COURSES: "/api/courses/all",
  COURSE_BY_ID: (id: string) => `/api/courses/${id}`,
} as const;

// Request configurations
export const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include" as RequestCredentials,
} as const;

export const MULTIPART_CONFIG = {
  credentials: "include" as RequestCredentials,
  // Don't set Content-Type for FormData, let browser set it
} as const;
