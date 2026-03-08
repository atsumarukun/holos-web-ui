"use client";

import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { deleteVolumes } from "@/features/storage/actions/delete-volumes";
import { errorToast, successToast } from "@/lib/toast";
import { refetchContext } from "@/providers/refetch";
import { useContext } from "react";

type Props = Readonly<{
  names: string[];
  open: boolean;
  onOpenChange: () => void;
}>;

export const DeleteVolumesConfirmDialog = ({
  names,
  open,
  onOpenChange,
}: Props) => {
  const context = useContext(refetchContext);

  const onApprove = async () => {
    const res = await deleteVolumes(names);
    const failures = Object.entries(res).filter(([, v]) => !v.success);
    if (failures.length === 0) {
      successToast("ボリュームを削除しました.");
    } else {
      failures.forEach(([k, v]) => {
        if (v.error) {
          errorToast(`「${k}」の削除に失敗しました.\n${v.error}`);
        } else {
          errorToast();
        }
      });
    }
    context.refetch();
    onOpenChange();
  };

  return (
    <ConfirmDialog
      title="ボリューム削除"
      description={`選択したボリュームを削除しますか？\n削除したボリュームは復元できません.`}
      approveLabel="削除"
      open={open}
      onOpenChange={onOpenChange}
      onApprove={onApprove}
    />
  );
};
