"use client";

import { Button } from "@/components/atoms/Button";
import { SearchBox } from "@/components/molecules/SearchBox";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CreateVolumeFormDialog } from "../CreateVolumeFormDialog";

type Props = Readonly<{
  refetch: () => void;
}>;

export const VolumeToolbar = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row justify-between gap-6">
        <SearchBox />
        <Button
          icon={LuPlus}
          label="作成"
          className="whitespace-nowrap"
          onClick={() => setOpen(true)}
        />
      </div>
      <CreateVolumeFormDialog
        open={open}
        onOpenChange={() => setOpen((v) => !v)}
        refetch={refetch}
      />
    </>
  );
};
