import { NextRequest, NextResponse } from "next/server";
import { parseCookie } from "@/lib/parseCookie";

const expressApiUrl = process.env.EXPRESS_API_BASE_URL;

export async function GET(req: NextRequest) {
  const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/dashboard";
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const response = await fetch(`${expressApiUrl}/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`,
    },
    credentials: "include",
  });

  if (response.ok) {
    const nextResponse = NextResponse.redirect(new URL(redirectUrl, req.url));
    const setCookies = response.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      nextResponse.cookies.set(parseCookie(cookie));
    });
    return nextResponse;
  }

  // Refresh failed
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", redirectUrl);
  const nextResponse = NextResponse.redirect(loginUrl);
  nextResponse.cookies.delete("accessToken");
  nextResponse.cookies.delete("refreshToken");
  return nextResponse;
}
