"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export const deleteEntries = async (
  volumeName: string,
  keys: string[],
): Promise<Record<string, { error?: ActionError }>> => {
  const res = await Promise.all(
    keys.map((key) => deleteEntry(volumeName, key)),
  );
  return Object.fromEntries(keys.map((key, i) => [key, res[i]]));
};

const deleteEntry = async (
  volumeName: string,
  key: string,
): Promise<{ error?: ActionError }> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/${key}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
        cache: "no-cache",
      },
    );

    if (res.ok) {
      return { error: undefined };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
