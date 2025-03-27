"use server";

import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { errorSchema } from "@/schemas/error";
import { Account, accountSchema } from "../schemas/account";
import { Signup } from "../schemas/signup";

export const signup = async (data: Signup): Promise<Account> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVER_HOST}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSnakeCase(data)),
    cache: "no-cache",
  });

  if (!res.ok) {
    const err = errorSchema.parse(await res.json());
    throw new Error(err.message, { cause: res.status });
  }

  return accountSchema.parse(toCamelCase(await res.json()));
};
