"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import {
  ActionError,
  InternalErr,
  isActionError,
  UnauthorizedErr,
} from "@/lib/errors";
import { redirect } from "next/navigation";

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

    if (res.status === 401) {
      throw UnauthorizedErr;
    }

    throw new Error(toCamelCase(await res.json()).message);
  } catch (err) {
    if (err === UnauthorizedErr) {
      redirect("/auth/signin");
    }
    console.error(err);
    return {
      error: isActionError(err) ? err : InternalErr,
    };
  }
};
