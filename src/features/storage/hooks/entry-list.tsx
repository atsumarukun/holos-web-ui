"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getEntries, GetEntriesResponse } from "../actions/get-entries";
import { ActionError } from "@/lib/errors";

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
}>;

export const useEntryList = ({ volumeName, currentKey }: Props) => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [entries, setEntries] = useState<GetEntriesResponse["entries"]>([]);
  const [error, setError] = useState<ActionError>();

  const fetch = useCallback(
    async (
      props?: Readonly<{
        onCompleted?: (args?: GetEntriesResponse["entries"]) => void;
        onError?: (args?: ActionError) => void;
      }>,
    ) => {
      setLoading(true);

      const { data, error } = await getEntries(volumeName, {
        prefix: currentKey,
        depth: 1,
      });
      if (data) {
        const searchedEntries = data.entries.filter((entry) =>
          entry.key.startsWith(searchParams.get("search") ?? ""),
        );
        const sortedEntries = [
          ...searchedEntries.filter((entry) => entry.type === "folder"),
          ...searchedEntries.filter((entry) => entry.type !== "folder"),
        ];
        setEntries(sortedEntries);
        props?.onCompleted?.(sortedEntries);
      } else {
        setError(error);
        props?.onError?.(error);
      }

      setLoading(false);
    },
    [volumeName, currentKey, searchParams],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    loading,
    entries,
    error,
    refetch: fetch,
  };
};
