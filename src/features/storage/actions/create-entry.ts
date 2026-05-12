"use server";

import { getToken } from "@/actions/token";
import { toCamelCase } from "@/lib/case-converters";
import { ActionError, ErrorResponse, toActionError } from "@/lib/errors";
import { toFormData } from "@/lib/form-data";

export type CreateEntryRequest = Readonly<{
  key: string;
  file?: File;
}>;

export type CreateEntryResponse = Readonly<{
  key: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export const createEntry = async (
  volumeName: string,
  data: CreateEntryRequest,
): Promise<{
  data?: CreateEntryResponse;
  error?: ActionError;
}> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Session ${token}`,
        },
        body: toFormData(data),
        cache: "no-cache",
      },
    );

    if (res.ok) {
      const data: CreateEntryResponse = toCamelCase(await res.json());
      return { data: data };
    }

    const error: ErrorResponse = toCamelCase(await res.json());
    return { error: error.error };
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
