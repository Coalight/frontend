import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/auth/logout`;

  try {
    const response = await fetch(expressUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    const responseHeaders = new Headers();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      responseHeaders.set("set-cookie", setCookie);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: response.ok,
        message:
          data.message || (response.ok ? "Logout successful" : "Logout failed"),
        errors: data.errors || null,
      },
      {
        headers: responseHeaders,
        status: response.status,
      }
    );
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
