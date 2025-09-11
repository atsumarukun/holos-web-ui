import { NextRequest, NextResponse } from "next/server";
import { authorize } from "./features/auth/actions/authorize";
import { getToken } from "./actions/token";

export const middleware = async (request: NextRequest) => {
  const token = await getToken();
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const res = await authorize(token);
  if (res.success && res.data) {
    const response = NextResponse.next();
    response.headers.set("account-name", res.data.name);
    return response;
  }
  return NextResponse.redirect(new URL("/auth/signin", request.url));
};

export const config = {
  matcher: "/((?!_next|favicon.ico|auth).*)",
};
