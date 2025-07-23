import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/courses/all`;

  try {

    const response = await fetch(expressUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    // Forward response with cookies
    return NextResponse.json(await response.json(), {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in GET /api/courses/all:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
