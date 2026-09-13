"use client";

import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Close, Content } from "@radix-ui/react-dialog";
import { GetEntriesResponse } from "@/features/storage/actions/get-entries";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PreviewEntry } from "../../molecules/PreviewEntry";
import { XIcon } from "lucide-react";

type Props = Readonly<{
  volumeName: string;
  entry: GetEntriesResponse["entries"][number];
  open: boolean;
  onOpenChange: () => void;
}>;

export const PreviewEntryDialog = ({
  volumeName,
  entry,
  open,
  onOpenChange,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay />
        <Content
          data-slot="dialog-content"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-0 m-auto z-50 grid w-fit h-fit duration-200 outline-none"
          onOpenAutoFocus={(e: Event) => {
            e.preventDefault();
          }}
        >
          <VisuallyHidden>
            <DialogTitle />
            <DialogDescription />
          </VisuallyHidden>
          <PreviewEntry
            volumeName={volumeName}
            entry={entry}
            className="max-w-[84vw] max-h-[84vh]"
          />
          <Close
            data-slot="dialog-close"
            className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground fixed top-4 right-4 rounded-xs text-white disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Close>
        </Content>
      </DialogPortal>
    </Dialog>
  );
};
