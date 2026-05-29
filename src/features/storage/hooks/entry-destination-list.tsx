"use client";

import { useCallback, useEffect, useState } from "react";
import { getEntries, GetEntriesResponse } from "../actions/get-entries";
import { ActionError } from "@/lib/errors";

type Props = Readonly<{
  volumeName: string;
  dstKey: string;
}>;

export const useEntryDestinationList = ({ volumeName, dstKey }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [entries, setEntries] = useState<GetEntriesResponse["entries"]>([]);
  const [error, setError] = useState<ActionError>();

  const fetch = useCallback(async () => {
    setLoading(true);

    const res = await getEntries(volumeName, {
      prefix: dstKey,
      depth: 1,
    });
    if (res.data) {
      setEntries(res.data.entries);
    } else if (res.error) {
      setError(res.error);
    }

    setLoading(false);
  }, [volumeName, dstKey]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    loading,
    entries,
    error,
  };
};
