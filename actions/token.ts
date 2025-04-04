"use server";

import { cookies } from "next/headers";

export const getToken = async (): Promise<string | undefined> => {
  const store = await cookies();
  return store.get("token")?.value;
};
