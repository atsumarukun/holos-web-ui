import { copyEntries } from "@/features/storage/actions/copy-entries";
import { updateEntries } from "@/features/storage/actions/update-entries";

export const entryDestinationDialogModes = {
  copy: {
    label: "コピー",
    action: copyEntries,
  },
  move: {
    label: "移動",
    action: updateEntries,
  },
} as const;

export type EntryDestinationDialogMode =
  keyof typeof entryDestinationDialogModes;
