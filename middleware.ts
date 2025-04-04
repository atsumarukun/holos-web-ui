import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./actions/token";

export const middleware = async (request: NextRequest) => {
  const token = await getToken();
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: "/((?!_next|favicon.ico|auth).*)",
};
