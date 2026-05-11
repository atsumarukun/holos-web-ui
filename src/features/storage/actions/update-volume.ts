"use server";

import { getToken } from "@/actions/token";
import { toCamelCase, toSnakeCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

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

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
