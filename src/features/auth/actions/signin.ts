"use server";

import { toCamelCase, toSnakeCase } from "@/lib/case-converters";

export type SigninRequest = Readonly<{
  accountName: string;
  password: string;
}>;

export type SigninResponse = Readonly<{
  token: string;
}>;

export const signin = async (
  data: SigninRequest
): Promise<{ success: boolean; data?: SigninResponse; error?: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSnakeCase(data)),
        cache: "no-cache",
      }
    );

    if (res.ok) {
      return { success: true, data: toCamelCase(await res.json()) };
    }

    if (res.status === 401) {
      return {
        success: false,
        error: "アカウントが存在しないかパスワードが異なります.",
      };
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
