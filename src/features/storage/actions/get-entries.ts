"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";
import { toURLSearchParams } from "@/lib/search-params";

export type GetEntriesResponse = Readonly<{
  entries: {
    key: string;
    size: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}>;

export const getEntries = async (
  volumeName: string,
  options?: { prefix?: string; depth?: number },
): Promise<{
  data?: GetEntriesResponse;
  error?: ActionError;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}${options ? "?" + toURLSearchParams(options) : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Session ${token}`,
        },
        cache: "no-cache",
      },
    );

    if (res.ok) {
      const data: GetEntriesResponse = toCamelCase(await res.json());
      return { data: data };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
