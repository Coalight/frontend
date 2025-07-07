import { NextRequest, NextResponse } from "next/server";

const PRIVATE_ROUTES = ["dashboard", "courses", "settings"];
const PUBLIC_ROUTES = ["login", "signup", "about", "contact"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const pathSegment = pathname.split("/").filter(Boolean)[0] || "";
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPrivateRoute = PRIVATE_ROUTES.includes(pathSegment);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathSegment);

  // Redirect unauthenticated users from private routes
  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next();
    }
    if (refreshToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/refresh";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from public routes or root
  if ((isPublicRoute && accessToken) || (pathname === "/" && accessToken)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
