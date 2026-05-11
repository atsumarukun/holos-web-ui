"use server";

import { setToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export type SigninRequest = Readonly<{
  accountName: string;
  password: string;
}>;

export type SigninResponse = Readonly<{
  token: string;
}>;

export const signin = async (
  data: SigninRequest,
): Promise<{ error?: ActionError }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/sessions`,
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
      const data: SigninResponse = toCamelCase(await res.json());
      await setToken(data.token);
      return {};
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
