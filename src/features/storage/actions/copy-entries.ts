"use server";

import { getToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export type CopyEntryRequest = Readonly<{
  key: string;
}>;

export type CopyEntryResponse = Readonly<{
  key: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export const copyEntries = async (
  volumeName: string,
  data: Record<string, CopyEntryRequest>,
): Promise<
  Record<string, { data?: CopyEntryResponse; error?: ActionError }>
> => {
  const res = await Promise.all(
    Object.entries(data).map(([key, val]) => copyEntry(volumeName, key, val)),
  );
  return Object.fromEntries(Object.keys(data).map((key, i) => [key, res[i]]));
};

const copyEntry = async (
  volumeName: string,
  key: string,
  data: CopyEntryRequest,
): Promise<{
  data?: CopyEntryResponse;
  error?: ActionError;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/${key}`,
      {
        method: "POST",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSnakeCase(data)),
        cache: "no-cache",
      },
    );

    if (res.ok) {
      const data: CopyEntryResponse = toCamelCase(await res.json());
      return { data: data };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
