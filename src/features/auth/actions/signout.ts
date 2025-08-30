"use server";

import { toCamelCase } from "@/lib/case-converters";

export const signout = async (
  token: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/logout`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
        cache: "no-cache",
      }
    );

    if (res.ok) {
      return { success: true };
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
