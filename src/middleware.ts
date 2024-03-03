import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const cookie = request.cookies;

  const isLoggedIn = JSON.parse(cookie.get("isLoggedIn")?.value || "false");

  if(pathname == "/"){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isLoggedIn && pathname.includes("dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLoggedIn && pathname.includes("login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(isLoggedIn && pathname.includes("signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
};

export default middleware;
