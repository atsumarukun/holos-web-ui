"use client";

import { useCallback, useEffect, useState } from "react";
import { getVolumes, GetVolumesResponse } from "../actions/get-volumes";
import { useSearchParams } from "next/navigation";
import { ActionError } from "@/lib/errors";

export const useVolumeList = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [volumes, setVolumes] = useState<GetVolumesResponse["volumes"]>([]);
  const [error, setError] = useState<ActionError>();

  const fetch = useCallback(
    async (
      props?: Readonly<{
        onCompleted?: (args?: GetVolumesResponse["volumes"]) => void;
        onError?: (args?: ActionError) => void;
      }>,
    ) => {
      setLoading(true);

      const { data, error } = await getVolumes();
      if (data) {
        const searchedVolumes = data.volumes.filter((volume) =>
          volume.name.startsWith(searchParams.get("search") ?? ""),
        );
        setVolumes(searchedVolumes);
        props?.onCompleted?.(searchedVolumes);
      } else {
        setError(error);
        props?.onError?.(error);
      }

      setLoading(false);
    },
    [searchParams],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    loading,
    volumes: volumes,
    error,
    refetch: fetch,
  };
};
