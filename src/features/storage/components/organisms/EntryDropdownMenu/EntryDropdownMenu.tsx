"use client";

import { IconButton } from "@/components/atoms/IconButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { GetEntriesResponse } from "@/features/storage/actions/get-entries";
import { useState } from "react";
import {
  LuCopy,
  LuEllipsisVertical,
  LuFolderOutput,
  LuPencil,
  LuTrash,
} from "react-icons/lu";
import { UpdateEntryFormDialog } from "../UpdateEntryFormDialog";
import { DeleteEntryConfirmDialog } from "../DeleteEntryComfirmDialog";
import { extractName } from "@/features/storage/lib/key";
import { EntryDestinationDialog } from "../EntryDestinationDialog";

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
  entry: GetEntriesResponse["entries"][number];
}>;

export const EntryDropdownMenu = ({ volumeName, currentKey, entry }: Props) => {
  const [onUpdateDialogOpen, setOnUpdateDialogOpen] = useState(false);
  const [onCopyDialogOpen, setOnCopyDialogOpen] = useState(false);
  const [onMoveDialogOpen, setOnMoveDialogOpen] = useState(false);
  const [onDeleteDialogOpen, setOnDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            icon={LuEllipsisVertical}
            variant="ghost"
            className="text-[#999999]"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6">
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            onClick={() => setOnUpdateDialogOpen(true)}
          >
            <LuPencil />
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            onClick={() => setOnCopyDialogOpen(true)}
          >
            <LuCopy />
            コピー
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            onClick={() => setOnMoveDialogOpen(true)}
          >
            <LuFolderOutput />
            移動
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 text-destructive focus:text-destructive focus:bg-destructive/10 hover:cursor-pointer"
            onClick={() => setOnDeleteDialogOpen(true)}
          >
            <LuTrash className="text-destructive" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateEntryFormDialog
        volumeName={volumeName}
        currentKey={currentKey}
        defaultValues={{ name: extractName(entry.key) }}
        open={onUpdateDialogOpen}
        onOpenChange={() => setOnUpdateDialogOpen((v) => !v)}
      />
      <EntryDestinationDialog
        mode="copy"
        volumeName={volumeName}
        currentKey={currentKey}
        entryKeys={[entry.key]}
        open={onCopyDialogOpen}
        onOpenChange={() => setOnCopyDialogOpen((v) => !v)}
      />
      <EntryDestinationDialog
        mode="move"
        volumeName={volumeName}
        currentKey={currentKey}
        entryKeys={[entry.key]}
        open={onMoveDialogOpen}
        onOpenChange={() => setOnMoveDialogOpen((v) => !v)}
      />
      <DeleteEntryConfirmDialog
        volumeName={volumeName}
        entryKey={entry.key}
        open={onDeleteDialogOpen}
        onOpenChange={() => setOnDeleteDialogOpen((v) => !v)}
      />
    </>
  );
};
