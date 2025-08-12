import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const courseId = searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json("Course ID is required", { status: 400 });
  }
  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/courses/people?courseID=${courseId}`;

  try {
    const response = await fetch(expressUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
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
    console.error("Error in GET /api/courses/info/people?courseID=:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
