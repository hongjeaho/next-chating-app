// https://next-auth.js.org/tutorials/securing-pages-and-api-routes

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return;
  }

  if (!session && !(pathname === "/" || pathname === "")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ((!!session && pathname === "/") || pathname === "") {
    return NextResponse.redirect(new URL("/conversations", req.url));
  }
};
