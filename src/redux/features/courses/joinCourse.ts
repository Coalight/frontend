import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { Course } from "@/types/course";

export interface JoinCourseResponse {
  success: boolean;
  message: string;
  course?: Course;
  errorDetails?: Error | unknown;
}

export const joinCourse = createAsyncThunk<
  JoinCourseResponse,
  { courseId: string; code: string },
  { rejectValue: JoinCourseResponse }
>("courses/joinCourse", async ({ courseId, code }, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/courses/join/${courseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const data = await response.json();
      toast.error(data.message || "Failed to join course");
      return rejectWithValue({
        success: false,
        message: data.message || "Failed to join course",
      });
    }

    const data = await response.json();
    toast.success("Successfully joined course!");
    return {
      success: true,
      message: "Successfully joined course!",
      course: data.course,
    };
  } catch (error) {
    toast.error("Server error while joining course");
    return rejectWithValue({
      success: false,
      message: "Server error while joining course",
      errorDetails: error,
    });
  }
});
