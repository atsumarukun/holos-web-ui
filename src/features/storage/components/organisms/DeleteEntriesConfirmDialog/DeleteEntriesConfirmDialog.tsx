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
  entryKeys: string[];
  open: boolean;
  onOpenChange: () => void;
}>;

export const DeleteEntriesConfirmDialog = ({
  volumeName,
  entryKeys,
  open,
  onOpenChange,
}: Props) => {
  const router = useRouter();
  const context = useContext(refetchContext);

  const onApprove = async () => {
    const res = await deleteEntries(volumeName, entryKeys);
    const failures = Object.entries(res).filter(([, v]) => !!v.error);
    if (failures.length === 0) {
      successToast("エントリーを削除しました.");
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
          errorToast(`「${extractName(k)}」の削除に失敗しました.`);
        });
      }
    }
    context.refetch();
    onOpenChange();
  };

  return (
    <ConfirmDialog
      title="エントリー削除"
      description={`選択したエントリーを削除しますか？\n削除したエントリーは復元できません.`}
      approveLabel="削除"
      open={open}
      onOpenChange={onOpenChange}
      onApprove={onApprove}
    />
  );
};
