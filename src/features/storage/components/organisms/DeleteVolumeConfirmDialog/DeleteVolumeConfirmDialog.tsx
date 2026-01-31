"use client";

import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { deleteVolumes } from "@/features/storage/actions/delete-volumes";
import { errorToast, successToast } from "@/lib/toast";

type Props = Readonly<{
  name: string;
  open: boolean;
  onOpenChange: () => void;
  refetch: () => void;
}>;

export const DeleteVolumeConfirmDialog = ({
  name,
  open,
  onOpenChange,
  refetch,
}: Props) => {
  const onApprove = async () => {
    const res = await deleteVolumes([name]);
    if (res[`${name}`].success) {
      successToast("ボリュームを削除しました.");
      refetch();
      onOpenChange();
    } else {
      if (res[`${name}`].error) {
        errorToast(res[`${name}`].error);
      } else {
        errorToast();
      }
    }
  };

  return (
    <ConfirmDialog
      title="ボリューム削除"
      description={`「${name}」を削除しますか？\n削除したボリュームは復元できません.`}
      approveLabel="削除"
      open={open}
      onOpenChange={onOpenChange}
      onApprove={onApprove}
    />
  );
};
