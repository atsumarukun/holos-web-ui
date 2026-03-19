"use client";

import { useEffect, useState } from "react";
import { getVolumes, GetVolumesResponse } from "../actions/get-volumes";
import { useSearchParams } from "next/navigation";

export const useVolumeList = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [volumes, setVolumes] = useState<GetVolumesResponse["volumes"]>([]);

  const fetch = async (
    props?: Readonly<{
      onCompleted?: (args?: GetVolumesResponse) => void;
      onError?: (args?: Error) => void;
    }>,
  ) => {
    setLoading(true);
    const result = await getVolumes();
    setSuccess(result.success);
    if (result.success) {
      setVolumes(result.data?.volumes ?? []);
      props?.onCompleted?.(result.data);
    } else {
      props?.onError?.(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const searchedVolumes = volumes.filter((volume) =>
    volume.name.startsWith(searchParams.get("search") ?? ""),
  );

  return {
    loading,
    success,
    volumes: searchedVolumes,
    refetch: fetch,
  };
};
