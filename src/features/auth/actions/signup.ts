"use server";

import { toCamelCase, toSnakeCase } from "@/lib/case-converters";

type SignupRequest = Readonly<{
  name: string;
  password: string;
  confirmPassword: string;
}>;

type SignupResponse = Readonly<{
  name: string;
}>;

export const signup = async (
  data: SignupRequest
): Promise<{ success: boolean; data?: SignupResponse; error?: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/accounts`,
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

    if (res.status === 409) {
      return { success: false, error: "アカウント名がすでに利用されています." };
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
