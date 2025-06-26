"use server";

import { toCamelCase } from "@/lib/case-converters";
import { getToken } from "./token";

export const authorize = async (): Promise<string | undefined> => {
  const token = await getToken();
  if (!token) {
    return undefined;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/authorization`,
      {
        method: "GET",
        headers: {
          Authorization: `Session ${token}`,
        },
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      return undefined;
    }

    return toCamelCase(await res.json()).name;
  } catch {
    return undefined;
  }
};
