"use server";

import { setToken } from "@/actions/token";
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
): Promise<{ success: boolean; error?: string }> => {
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
      const data: SigninResponse = toCamelCase(await res.json());
      await setToken(data.token);
      return { success: true };
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
