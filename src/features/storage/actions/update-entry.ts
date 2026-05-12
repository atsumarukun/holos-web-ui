"use server";

import { getToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export type UpdateEntryRequest = Readonly<{
  key: string;
}>;

export type UpdateEntryResponse = Readonly<{
  key: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export const updateEntry = async (
  volumeName: string,
  key: string,
  data: UpdateEntryRequest,
): Promise<{
  data?: UpdateEntryResponse;
  error?: ActionError;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/${key}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSnakeCase(data)),
        cache: "no-cache",
      },
    );

    if (res.ok) {
      const data: UpdateEntryResponse = toCamelCase(await res.json());
      return { data: data };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
