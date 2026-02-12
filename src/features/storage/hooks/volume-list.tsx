"use client";

import { useEffect, useState } from "react";
import { getVolumes, GetVolumesResponse } from "../actions/get-volumes";
import { useSearchParams } from "next/navigation";

export const useVolumeList = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [volumes, setVolumes] = useState<GetVolumesResponse["volumes"]>([]);

  const fetch = async () => {
    setLoading(true);
    const result = await getVolumes();
    setSuccess(result.success);
    if (result.success && result.data) {
      setVolumes(result.data.volumes);
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
