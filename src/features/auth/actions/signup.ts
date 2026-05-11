"use server";

import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export type SignupRequest = Readonly<{
  name: string;
  password: string;
  confirmPassword: string;
}>;

export type SignupResponse = Readonly<{
  name: string;
}>;

export const signup = async (
  data: SignupRequest,
): Promise<{ data?: SignupResponse; error?: ActionError }> => {
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
      },
    );

    if (res.ok) {
      return { data: toCamelCase(await res.json()) };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
