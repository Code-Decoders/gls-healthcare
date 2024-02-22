import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const isAuthenticated = true;
  const { pathname } = request.nextUrl;

  console.log("This is the route", pathname);

  if (!isAuthenticated && pathname.includes("dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export default middleware;
