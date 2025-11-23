"use server";

import { getToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { UnauthorizedErr } from "@/lib/errors";
import { redirect } from "next/navigation";

export type CreateVolumeRequest = Readonly<{
  name: string;
  isPublic: boolean;
}>;

export type CreateVolumeResponse = Readonly<{
  name: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export const createVolume = async (
  data: CreateVolumeRequest
): Promise<{
  success: boolean;
  data?: CreateVolumeResponse;
  error?: string;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes`,
      {
        method: "POST",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSnakeCase(data)),
        cache: "no-cache",
      }
    );

    if (res.ok) {
      const data: CreateVolumeResponse = toCamelCase(await res.json());
      return { success: true, data: data };
    }

    if (res.status === 401) {
      throw UnauthorizedErr;
    }

    if (res.status === 409) {
      return { success: false, error: "ボリューム名がすでに利用されています." };
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    if (err === UnauthorizedErr) {
      redirect("/auth/signin");
    }
    console.error(err);
    return { success: false };
  }
};
