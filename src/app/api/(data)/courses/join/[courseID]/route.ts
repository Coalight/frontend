import { NextResponse } from "next/server";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseID: string }> }
) {
  try {
    const { code } = await request.json();
    const { courseID } = await params;
    const expressURL = `${process.env.EXPRESS_API_BASE_URL}/courses/join/${courseID}`;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Joining code is required and must be a string",
        },
        { status: 400 }
      );
    }

    const response = await fetch(expressURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: JSON.stringify({ code }),
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
    console.error("Error in POST /api/courses/join/[courseID]:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
