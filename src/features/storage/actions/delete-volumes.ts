"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import { UnauthorizedErr } from "@/lib/errors";
import { redirect } from "next/navigation";

export const deleteVolumes = async (
  names: string[]
): Promise<Record<string, { success: boolean; error?: string }>> => {
  const res = await Promise.all(names.map((name) => deleteVolume(name)));

  if (res.some((v) => v.error === UnauthorizedErr.message)) {
    redirect("/auth/signin");
  }

  return Object.fromEntries(names.map((name, i) => [name, res[i]]));
};

const deleteVolume = async (
  name: string
): Promise<{ success: boolean; error?: string }> => {
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
      }
    );

    if (res.ok) {
      return { success: true };
    }

    if (res.status === 401) {
      return { success: false, error: UnauthorizedErr.message };
    }

    if (res.status === 409) {
      return { success: false, error: "空ではないボリュームは削除できません." };
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
