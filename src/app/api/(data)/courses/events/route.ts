import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json("Course ID is required", { status: 400 });
  }

  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/courses/events?courseID=${courseId}`;

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

    return NextResponse.json(data, {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in GET /api/courses/events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/courses/events`;

    const response = await fetch(expressUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in POST /api/courses/events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json("Event ID is required", { status: 400 });
  }

  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/courses/events/${eventId}`;

  try {
    const response = await fetch(expressUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in DELETE /api/courses/events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
