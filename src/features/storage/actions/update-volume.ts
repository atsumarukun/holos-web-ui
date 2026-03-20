"use server";

import { getToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import {
  ActionError,
  ConflictErr,
  InternalErr,
  isActionError,
  UnauthorizedErr,
} from "@/lib/errors";
import { redirect } from "next/navigation";

export type UpdateVolumeRequest = Readonly<{
  name: string;
  isPublic: boolean;
}>;

export type UpdateVolumeResponse = Readonly<{
  name: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export const updateVolume = async (
  name: string,
  data: UpdateVolumeRequest,
): Promise<{
  data?: UpdateVolumeResponse;
  error?: ActionError;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes/${name}`,
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
      const data: UpdateVolumeResponse = toCamelCase(await res.json());
      return { data: data };
    }

    if (res.status === 401) {
      throw UnauthorizedErr;
    }

    if (res.status === 409) {
      throw ConflictErr;
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    if (err === UnauthorizedErr) {
      redirect("/auth/signin");
    }
    console.error(err);
    return { error: isActionError(err) ? err : InternalErr };
  }
};
