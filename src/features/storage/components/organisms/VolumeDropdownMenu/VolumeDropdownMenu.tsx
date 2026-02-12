"use client";

import { IconButton } from "@/components/atoms/IconButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { GetVolumesResponse } from "@/features/storage/actions/get-volumes";
import { useState } from "react";
import { LuEllipsisVertical, LuPencil, LuTrash } from "react-icons/lu";
import { UpdateVolumeFormDialog } from "../UpdateVolumeFormDialog";
import { DeleteVolumeConfirmDialog } from "../DeleteVolumeConfirmDialog";

type Props = Readonly<{
  volume: GetVolumesResponse["volumes"][number];
  refetch: () => void;
}>;

export const VolumeDropdownMenu = ({ volume, refetch }: Props) => {
  const [onUpdateDialogOpen, setOnUpdateDialogOpen] = useState(false);
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
            className="flex-row items-center gap-1 text-destructive focus:text-destructive focus:bg-destructive/10 hover:cursor-pointer"
            onClick={() => setOnDeleteDialogOpen(true)}
          >
            <LuTrash className="text-destructive" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateVolumeFormDialog
        defaultValues={{ name: volume.name, isPublic: volume.isPublic }}
        open={onUpdateDialogOpen}
        onOpenChange={() => setOnUpdateDialogOpen((v) => !v)}
        refetch={refetch}
      />
      <DeleteVolumeConfirmDialog
        name={volume.name}
        open={onDeleteDialogOpen}
        onOpenChange={() => setOnDeleteDialogOpen((v) => !v)}
        refetch={refetch}
      />
    </>
  );
};
