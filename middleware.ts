import { NextRequest, NextResponse } from "next/server";
import { authorize } from "./actions/authorize";

export const middleware = async (request: NextRequest) => {
  const accountName = await authorize();
  if (!accountName) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  const res = NextResponse.next();
  res.headers.set("account-name", accountName);
  return res;
};

export const config = {
  matcher: "/((?!_next|favicon.ico|auth).*)",
};
