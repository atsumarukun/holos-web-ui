"use client";

import { useState } from "react";
import { GetVolumesResponse } from "../actions/get-volumes";

type Props = Readonly<{
  volumes: GetVolumesResponse["volumes"];
}>;

export const useVolumeSelection = ({ volumes }: Props) => {
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([]);

  const isSelectedAll = selectedVolumes.length === volumes.length;

  const onSelectAll = () => {
    if (isSelectedAll) {
      setSelectedVolumes([]);
    } else {
      setSelectedVolumes(volumes.map((volume) => volume.name));
    }
  };

  const onSelect = (name: string) => {
    if (selectedVolumes.includes(name)) {
      setSelectedVolumes((volumes) =>
        volumes.filter((volume) => volume !== name),
      );
    } else {
      setSelectedVolumes((volumes) => [...volumes, name]);
    }
  };

  return {
    isSelectedAll,
    selectedVolumes,
    onSelectAll,
    onSelect,
  };
};
