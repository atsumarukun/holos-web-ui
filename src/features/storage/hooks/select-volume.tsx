"use client";

import { useState } from "react";
import { GetVolumesResponse } from "../actions/get-volumes";

type Props = Readonly<{
  volumes: GetVolumesResponse["volumes"];
}>;

export const useVolumeSelection = ({ volumes }: Props) => {
  const [selectedVolumeNames, setSelectedVolumeNames] = useState<string[]>([]);

  const isSelectedAll = selectedVolumeNames.length === volumes.length;

  const onSelectAll = () => {
    if (isSelectedAll) {
      setSelectedVolumeNames([]);
    } else {
      setSelectedVolumeNames(volumes.map((volume) => volume.name));
    }
  };

  const onSelect = (name: string) => {
    if (selectedVolumeNames.includes(name)) {
      setSelectedVolumeNames((volumes) =>
        volumes.filter((volume) => volume !== name),
      );
    } else {
      setSelectedVolumeNames((volumes) => [...volumes, name]);
    }
  };

  const onClear = () => {
    setSelectedVolumeNames([]);
  };

  return {
    isSelectedAll,
    selectedVolumeNames,
    onSelectAll,
    onSelect,
    onClear,
  };
};
