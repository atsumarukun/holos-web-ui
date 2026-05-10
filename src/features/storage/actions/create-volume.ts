"use server";

import { getToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";
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
  data: CreateVolumeRequest,
): Promise<{
  data?: CreateVolumeResponse;
  error?: ActionError;
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
      },
    );

    if (res.ok) {
      const data: CreateVolumeResponse = toCamelCase(await res.json());
      return { data: data };
    }

    if (res.status === 401 || res.status === 403) {
      redirect("/auth/signin");
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
