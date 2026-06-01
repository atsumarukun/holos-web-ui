"use client";

import { refetchContext } from "@/providers/refetch";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  EntryDestinationDialogMode,
  entryDestinationDialogModes,
} from "./mode";
import { errorToast, successToast } from "@/lib/toast";
import { errorCode } from "@/lib/errors";
import { extractName } from "@/features/storage/lib/key";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/atoms/Button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Error } from "@/components/molecules/Error";
import { FiAlertTriangle } from "react-icons/fi";
import { Breadcrumb } from "../../molecules/Breadcrumb";
import { EntryDestinationList } from "../../molecules/EntryDestinationList";
import { useEntryDestinationList } from "@/features/storage/hooks/entry-destination-list";

type Props = Readonly<{
  mode: EntryDestinationDialogMode;
  volumeName: string;
  currentKey: string;
  entryKeys: string[];
  open: boolean;
  onOpenChange: () => void;
}>;

export const EntryDestinationDialog = (props: Props) => {
  const { open, onOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && <EntryDestinationDialogContent {...props} />}
    </Dialog>
  );
};

const EntryDestinationDialogContent = ({
  mode,
  volumeName,
  currentKey,
  entryKeys,
  onOpenChange,
}: Props) => {
  const { label, action } = entryDestinationDialogModes[mode];

  const router = useRouter();
  const context = useContext(refetchContext);

  const [dstKey, setDstKey] = useState(currentKey);

  const { entries, error } = useEntryDestinationList({
    volumeName: volumeName,
    dstKey: dstKey,
  });

  useEffect(() => {
    if (
      error?.code === errorCode.Unauthenticated ||
      error?.code === errorCode.Unauthorized
    ) {
      router.push("/auth/signin");
    }
  }, [error, router]);

  const onAction = async () => {
    const res = await action(
      volumeName,
      Object.fromEntries(
        entryKeys.map((key) => [key, { key: `${dstKey}/${extractName(key)}` }]),
      ),
    );
    const failures = Object.entries(res).filter(([, v]) => !!v.error);
    if (failures.length === 0) {
      successToast(`エントリーを${label}しました.`);
    } else {
      if (
        failures.some(
          ([, v]) =>
            v.error?.code === errorCode.Unauthenticated ||
            v.error?.code === errorCode.Unauthorized,
        )
      ) {
        router.push("/auth/signin");
      } else {
        failures.forEach(([k]) => {
          errorToast(`「${extractName(k)}」の${label}に失敗しました.`);
        });
      }
    }
    context.refetch();
    onOpenChange();
  };

  return (
    <DialogContent className="min-w-[1024px] h-[512px] max-w-none flex flex-col">
      <DialogHeader>
        <DialogTitle>{`エントリー${label}`}</DialogTitle>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogHeader>
      <Breadcrumb
        volumeName={volumeName}
        entryKey={dstKey}
        onClickPart={setDstKey}
      />
      {error ? (
        <Error
          icon={FiAlertTriangle}
          title="エントリーの取得に失敗しました"
          description="再度ダイアログを読み込み直してください."
          variant="dialog"
        />
      ) : (
        <EntryDestinationList entries={entries} onSelect={setDstKey} />
      )}
      <DialogFooter>
        <Button
          variant="outline"
          label="キャンセル"
          type="button"
          onClick={onOpenChange}
        />
        <Button
          label={`ここに${label}`}
          onClick={onAction}
          disabled={!!error}
        />
      </DialogFooter>
    </DialogContent>
  );
};
