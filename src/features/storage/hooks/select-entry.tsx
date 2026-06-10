"use client";

import { useState } from "react";
import { GetEntriesResponse } from "../actions/get-entries";

type Props = Readonly<{
  entries: GetEntriesResponse["entries"];
}>;

export const useEntrySelection = ({ entries }: Props) => {
  const [selectedEntryKeys, setSelectedEntryKeys] = useState<string[]>([]);

  const isSelectedAll = selectedEntryKeys.length === entries.length;

  const onSelectAll = () => {
    if (isSelectedAll) {
      setSelectedEntryKeys([]);
    } else {
      setSelectedEntryKeys(entries.map((entry) => entry.key));
    }
  };

  const onSelect = (key: string) => {
    if (selectedEntryKeys.includes(key)) {
      setSelectedEntryKeys((entryKeys) =>
        entryKeys.filter((entryKey) => entryKey !== key),
      );
    } else {
      setSelectedEntryKeys((entryKeys) => [...entryKeys, key]);
    }
  };

  const onClear = () => {
    setSelectedEntryKeys([]);
  };

  return {
    isSelectedAll,
    selectedEntryKeys,
    onSelectAll,
    onSelect,
    onClear,
  };
};
