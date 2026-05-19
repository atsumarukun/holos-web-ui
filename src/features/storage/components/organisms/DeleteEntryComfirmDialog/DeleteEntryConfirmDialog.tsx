"use client";

import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { deleteEntries } from "@/features/storage/actions/delete-entries";
import { extractName } from "@/features/storage/lib/key";
import { errorCode } from "@/lib/errors";
import { errorToast, successToast } from "@/lib/toast";
import { refetchContext } from "@/providers/refetch";
import { useRouter } from "next/navigation";
import { useContext } from "react";

type Props = Readonly<{
  volumeName: string;
  entryKey: string;
  open: boolean;
  onOpenChange: () => void;
}>;

export const DeleteEntryConfirmDialog = ({
  volumeName,
  entryKey,
  open,
  onOpenChange,
}: Props) => {
  const router = useRouter();
  const context = useContext(refetchContext);

  const onApprove = async () => {
    const res = await deleteEntries(volumeName, [entryKey]);
    if (!res[`${entryKey}`].error) {
      successToast("エントリーを削除しました.");
      context.refetch();
      onOpenChange();
    } else {
      if (
        res[`${entryKey}`].error?.code === errorCode.Unauthenticated ||
        res[`${entryKey}`].error?.code === errorCode.Unauthorized
      ) {
        router.push("/auth/signin");
      } else {
        errorToast();
      }
    }
  };

  return (
    <ConfirmDialog
      title="エントリー削除"
      description={`「${extractName(entryKey)}」を削除しますか？\n削除したエントリーは復元できません.`}
      approveLabel="削除"
      open={open}
      onOpenChange={onOpenChange}
      onApprove={onApprove}
    />
  );
};
