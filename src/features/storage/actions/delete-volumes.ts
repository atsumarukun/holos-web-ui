"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export const deleteVolumes = async (
  names: string[],
): Promise<Record<string, { error?: ActionError }>> => {
  const res = await Promise.all(names.map((name) => deleteVolume(name)));
  return Object.fromEntries(names.map((name, i) => [name, res[i]]));
};

const deleteVolume = async (name: string): Promise<{ error?: ActionError }> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes/${name}`,
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
