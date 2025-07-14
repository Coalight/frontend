import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/user/courses/new`;

  try {
    const body = await request.json();

    const response = await fetch(expressUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: JSON.stringify(body),
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
    console.error("Error in POST /api/user/courses/new:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
