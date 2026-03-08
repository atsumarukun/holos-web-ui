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
import { LuEllipsisVertical, LuTrash } from "react-icons/lu";
import { DeleteVolumesConfirmDialog } from "../DeleteVolumesConfirmDialog";

type Props = Readonly<{
  volumes: string[];
}>;

export const SelectedVolumesDropdownMenu = ({ volumes }: Props) => {
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
            <span className="font-medium">{volumes.length}</span> 件選択中
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="flex-row items-center gap-1 text-destructive focus:text-destructive focus:bg-destructive/10 hover:cursor-pointer"
            disabled={volumes.length === 0}
            onClick={() => setOnDeleteDialogOpen(true)}
          >
            <LuTrash className="text-destructive" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteVolumesConfirmDialog
        names={volumes}
        open={onDeleteDialogOpen}
        onOpenChange={() => setOnDeleteDialogOpen((v) => !v)}
      />
    </>
  );
};
