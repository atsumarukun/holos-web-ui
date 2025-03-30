"use server";

import {
  ActionsError,
  actionsErrorCode,
  toActionsErrorCode,
} from "@/lib/actions-error";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { errorSchema } from "@/schemas/error";
import { Account, accountSchema } from "../schemas/account";
import { Signup } from "../schemas/signup";

export const signup = async (data: Signup): Promise<Account | ActionsError> => {
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

    if (!res.ok) {
      const result = errorSchema.safeParse(await res.json());
      if (result.success) {
        return {
          type: "ActionsError",
          message: result.data.message,
          code: toActionsErrorCode(res.status),
        };
      } else {
        throw new Error("invalid fetch response");
      }
    }

    const result = accountSchema.safeParse(toCamelCase(await res.json()));
    if (result.success) {
      return result.data;
    } else {
      throw new Error("invalid fetch response");
    }
  } catch (e) {
    if (e instanceof Error) {
      return {
        type: "ActionsError",
        message: e.message,
        code: actionsErrorCode.Unknown,
      };
    } else {
      return {
        type: "ActionsError",
        message: "failed to signup",
        code: actionsErrorCode.Unknown,
      };
    }
  }
};
