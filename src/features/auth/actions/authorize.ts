"use server";

import { toCamelCase } from "@/lib/case-converters";

export const authorize = async (
  token: string
): Promise<{ success: boolean; data?: { name: string }; error?: string }> => {
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

    if (res.ok) {
      return {
        success: true,
        data: { name: toCamelCase(await res.json()).name }, // NOTE: account_idを隠蔽するためnameのみ返却.
      };
    }

    if (res.status === 401) {
      return { success: false, error: "認証に失敗しました." };
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
