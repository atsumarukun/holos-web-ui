"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";

export type GetVolumesResponse = Readonly<{
  volumes: {
    name: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}>;

export const getVolumes = async (): Promise<{
  data?: GetVolumesResponse;
  error?: ActionError;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes`,
      {
        method: "GET",
        headers: {
          Authorization: `Session ${token}`,
        },
        cache: "no-cache",
      },
    );

    if (res.ok) {
      const data: GetVolumesResponse = toCamelCase(await res.json());
      return { data: data };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
