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

  const onSelect = (entryKey: string) => {
    if (selectedEntryKeys.includes(entryKey)) {
      setSelectedEntryKeys((entryKeys) =>
        entryKeys.filter((entryKey) => entryKey !== entryKey),
      );
    } else {
      setSelectedEntryKeys((entryKeys) => [...entryKeys, entryKey]);
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
