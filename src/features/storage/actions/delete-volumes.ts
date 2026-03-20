"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import {
  ActionError,
  ConflictErr,
  InternalErr,
  isActionError,
  UnauthorizedErr,
} from "@/lib/errors";
import { redirect } from "next/navigation";

export const deleteVolumes = async (
  names: string[],
): Promise<Record<string, { error?: ActionError }>> => {
  const res = await Promise.all(names.map((name) => deleteVolume(name)));

  if (res.some((v) => v.error === UnauthorizedErr)) {
    redirect("/auth/signin");
  }

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

    if (res.status === 401) {
      throw UnauthorizedErr;
    }

    if (res.status === 409) {
      throw ConflictErr;
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    console.error(err);
    return { error: isActionError(err) ? err : InternalErr };
  }
};
