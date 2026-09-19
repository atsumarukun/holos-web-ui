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
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
            onClick={() => setUpdateDialogOpen(true)}
          >
            <LuPencil />
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            onClick={() => setCopyDialogOpen(true)}
          >
            <LuCopy />
            コピー
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            onClick={() => setMoveDialogOpen(true)}
          >
            <LuFolderOutput />
            移動
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 text-destructive focus:text-destructive focus:bg-destructive/10 hover:cursor-pointer"
            onClick={() => setDeleteDialogOpen(true)}
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
        open={updateDialogOpen}
        onOpenChange={() => setUpdateDialogOpen((v) => !v)}
      />
      <EntryDestinationDialog
        mode="copy"
        volumeName={volumeName}
        currentKey={currentKey}
        entryKeys={[entry.key]}
        open={copyDialogOpen}
        onOpenChange={() => setCopyDialogOpen((v) => !v)}
      />
      <EntryDestinationDialog
        mode="move"
        volumeName={volumeName}
        currentKey={currentKey}
        entryKeys={[entry.key]}
        open={moveDialogOpen}
        onOpenChange={() => setMoveDialogOpen((v) => !v)}
      />
      <DeleteEntryConfirmDialog
        volumeName={volumeName}
        entryKey={entry.key}
        open={deleteDialogOpen}
        onOpenChange={() => setDeleteDialogOpen((v) => !v)}
      />
    </>
  );
};
