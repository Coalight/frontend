import { Course } from "@/types/course";

export interface JoinCourseResponse {
  success: boolean;
  message: string;
  course?: Course;
}

export async function joinCourse(
  courseID: string,
  code: string
): Promise<JoinCourseResponse> {
  try {
    const response = await fetch(`/api/courses/join/${courseID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "Failed to join course",
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: "Successfully joined course",
      course: data.course,
    };
  } catch (error) {
    console.error("Join course error:", error);
    return {
      success: false,
      message: "Server error occurred while joining course",
    };
  }
}
