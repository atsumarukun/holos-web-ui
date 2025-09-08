"use server";

import { cookies } from "next/headers";

export const setToken = async (token: string) => {
  const store = await cookies();
  store.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // NOTE: 7日
  });
};
