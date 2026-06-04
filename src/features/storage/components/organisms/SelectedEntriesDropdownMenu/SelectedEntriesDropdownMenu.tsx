"use client";

import { IconButton } from "@/components/atoms/IconButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useState } from "react";
import {
  LuCopy,
  LuEllipsisVertical,
  LuFolderOutput,
  LuTrash,
} from "react-icons/lu";
import { EntryDestinationDialog } from "../EntryDestinationDialog";
import { DeleteEntriesConfirmDialog } from "../DeleteEntriesConfirmDialog";

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
  entryKeys: string[];
}>;

export const SelectedEntriesDropdownMenu = ({
  volumeName,
  currentKey,
  entryKeys,
}: Props) => {
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
          <DropdownMenuLabel className="font-normal">
            <span className="font-medium">{entryKeys.length}</span> 件選択中
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            disabled={entryKeys.length === 0}
            onClick={() => setOnCopyDialogOpen(true)}
          >
            <LuCopy />
            コピー
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 hover:cursor-pointer"
            disabled={entryKeys.length === 0}
            onClick={() => setOnMoveDialogOpen(true)}
          >
            <LuFolderOutput />
            移動
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row items-center gap-1 text-destructive focus:text-destructive focus:bg-destructive/10 hover:cursor-pointer"
            disabled={entryKeys.length === 0}
            onClick={() => setOnDeleteDialogOpen(true)}
          >
            <LuTrash className="text-destructive" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EntryDestinationDialog
        mode="copy"
        volumeName={volumeName}
        currentKey={currentKey}
        entryKeys={entryKeys}
        open={onCopyDialogOpen}
        onOpenChange={() => setOnCopyDialogOpen((v) => !v)}
      />
      <EntryDestinationDialog
        mode="move"
        volumeName={volumeName}
        currentKey={currentKey}
        entryKeys={entryKeys}
        open={onMoveDialogOpen}
        onOpenChange={() => setOnMoveDialogOpen((v) => !v)}
      />
      <DeleteEntriesConfirmDialog
        volumeName={volumeName}
        entryKeys={entryKeys}
        open={onDeleteDialogOpen}
        onOpenChange={() => setOnDeleteDialogOpen((v) => !v)}
      />
    </>
  );
};
