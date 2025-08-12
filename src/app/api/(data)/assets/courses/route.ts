import { NextRequest, NextResponse } from "next/server";

// get all assets for a course
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const courseId = searchParams.get("courseId");
    const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/assets/courses?courseId=${courseId}`;

    if (!courseId) {
      return NextResponse.json(
        { message: "courseId is required" },
        { status: 400 }
      );
    }
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
    console.error("Error in GET /api/assets/courses?courseId=[id]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const courseId = searchParams.get("courseId");
    const body = await request.json();
    const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/assets/courses?courseId=${courseId}`;

    const response = await fetch(expressUrl, {
      method: "PATCH",
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
    console.error("Error in PATCH /api/courses/assets/[id]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// upload a asset
export async function POST(request: NextRequest) {
  try {
    // Check if the request is a file upload
    const contentType = request.headers.get("content-type") || "";
    const { searchParams } = request.nextUrl;
    const courseId = searchParams.get("courseId");

    let body;
    let expressUrl = `${process.env.EXPRESS_API_BASE_URL}/assets/courses?courseId=${courseId}`;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      expressUrl = `${process.env.EXPRESS_API_BASE_URL}/assets/courses/upload?courseId=${courseId}`;
      body = formData;
    } else {
      // Handle JSON data (for external links)
      body = JSON.stringify(await request.json());
    }

    const response = await fetch(expressUrl, {
      method: "POST",
      headers: {
        ...(!contentType.includes("multipart/form-data") && {
          "Content-Type": "application/json",
        }),
        Cookie: request.headers.get("Cookie") || "",
      },
      body,
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
    console.error("Error in POST /api/courses/assets:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
