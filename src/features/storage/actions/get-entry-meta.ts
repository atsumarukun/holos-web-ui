"use server";

import { getToken } from "@/actions/token";
import { ActionError, errorCode, toActionError } from "@/lib/errors";

export type GetEntryMetaResponse = Readonly<{
  size: number;
  type: string;
  updatedAt: Date;
}>;

export const getEntryMeta = async (
  volumeName: string,
  key: string,
): Promise<{ data?: GetEntryMetaResponse; error?: ActionError }> => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/${key}`,
      {
        method: "HEAD",
        headers: {
          Authorization: `Session ${token}`,
        },
        cache: "no-cache",
      },
    );

    if (res.ok) {
      const data: GetEntryMetaResponse = {
        size: Number(res.headers.get("Content-Length")),
        type: res.headers.get("Holos-Entry-Type") ?? "",
        updatedAt: new Date(res.headers.get("Last-Modified") ?? ""),
      };
      return { data: data };
    }

    // NOTE: HEADメソッドはResponseBodyを返却しないためStatusCodeでエラーをハンドリングする.
    switch (res.status) {
      case 401:
        return {
          error: {
            code: errorCode.Unauthenticated,
            message: "unauthenticated",
          },
        };
      case 403:
        return {
          error: {
            code: errorCode.Unauthorized,
            message: "unauthorized",
          },
        };
      case 404:
        return {
          error: {
            code: errorCode.NotFound,
            message: "entry not found",
          },
        };
      default:
        return {
          error: {
            code: errorCode.InternalServerError,
            message: "internal server error",
          },
        };
    }
  } catch (err) {
    console.error(err);
    return { error: toActionError(err) };
  }
};
