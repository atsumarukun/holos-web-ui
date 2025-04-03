"use server";

import {
  ActionsError,
  actionsErrorCode,
  toActionsErrorCode,
} from "@/lib/actions-error";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { errorSchema } from "@/schemas/error";
import { Session, sessionSchema } from "../schemas/session";
import { Signin } from "../schemas/signin";

export const signin = async (data: Signin): Promise<Session | ActionsError> => {
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

    if (!res.ok) {
      const result = errorSchema.safeParse(toCamelCase(await res.json()));
      if (result.success) {
        return {
          type: "ActionsError",
          message: result.data.message,
          code: toActionsErrorCode(res.status),
        };
      }
      throw new Error("invalid fetch response");
    }

    const result = sessionSchema.safeParse(toCamelCase(await res.json()));
    if (result.success) {
      return result.data;
    }
    throw new Error("invalid fetch response");
  } catch (e) {
    return {
      type: "ActionsError",
      message: e instanceof Error ? e.message : "failed to signup",
      code: actionsErrorCode.Unknown,
    };
  }
};
