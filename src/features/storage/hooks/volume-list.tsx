"use client";

import { useCallback, useEffect, useState } from "react";
import { getVolumes, GetVolumesResponse } from "../actions/get-volumes";
import { useSearchParams } from "next/navigation";

export const useVolumeList = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [volumes, setVolumes] = useState<GetVolumesResponse["volumes"]>([]);
  const [error, setError] = useState<Error>();

  const fetch = useCallback(
    async (
      props?: Readonly<{
        onCompleted?: (args?: GetVolumesResponse["volumes"]) => void;
        onError?: (args?: Error) => void;
      }>,
    ) => {
      setLoading(true);

      const result = await getVolumes();
      if (result.data) {
        const searchedVolumes = result.data.volumes.filter((volume) =>
          volume.name.startsWith(searchParams.get("search") ?? ""),
        );
        setVolumes(searchedVolumes);
        props?.onCompleted?.(searchedVolumes);
      } else {
        setError(result.error);
        props?.onError?.(result.error);
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
