"use client";

import { Button } from "@/components/atoms/Button";
import { SearchBox } from "@/components/molecules/SearchBox";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CreateEntryFormDialog } from "../CreateEntryFormDialog/CreateEntryFormDialog";

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
}>;

export const EntryToolbar = ({ volumeName, currentKey }: Props) => {
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
      <CreateEntryFormDialog
        volumeName={volumeName}
        currentKey={currentKey}
        open={open}
        onOpenChange={() => setOpen((v) => !v)}
      />
    </>
  );
};
