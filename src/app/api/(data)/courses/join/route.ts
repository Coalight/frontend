import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { joiningID } = body;

    // Validate courseId
    if (!joiningID || typeof joiningID !== "string") {
      return NextResponse.json(
        { message: "Joining ID is required and must be a string" },
        { status: 400 }
      );
    }

    // Sanitize courseId
    const sanitizedCourseId = joiningID.replace(/[^a-zA-Z0-9-_]/g, "").trim();

    if (!sanitizedCourseId) {
      return NextResponse.json(
        { message: "Invalid course ID format" },
        { status: 400 }
      );
    }

    // Forward request to Express backend
    const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/courses/enroll`;

    const response = await fetch(expressUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
      body: JSON.stringify({ joiningID: sanitizedCourseId }),
    });

    const data = await response.json();

    // Forward response with cookies
    return NextResponse.json(data, {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in POST /api/courses/enroll:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
