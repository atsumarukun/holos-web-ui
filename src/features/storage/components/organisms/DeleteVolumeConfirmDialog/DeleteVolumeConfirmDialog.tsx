"use client";

import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";
import { deleteVolumes } from "@/features/storage/actions/delete-volumes";
import { errorCode } from "@/lib/errors";
import { errorToast, successToast } from "@/lib/toast";
import { refetchContext } from "@/providers/refetch";
import { useRouter } from "next/navigation";
import { useContext } from "react";

type Props = Readonly<{
  name: string;
  open: boolean;
  onOpenChange: () => void;
}>;

export const DeleteVolumeConfirmDialog = ({
  name,
  open,
  onOpenChange,
}: Props) => {
  const router = useRouter();
  const context = useContext(refetchContext);

  const onApprove = async () => {
    const res = await deleteVolumes([name]);
    if (!res[`${name}`].error) {
      successToast("ボリュームを削除しました.");
      context.refetch();
      onOpenChange();
    } else {
      if (
        res[`${name}`].error?.code === errorCode.Unauthenticated ||
        res[`${name}`].error?.code === errorCode.Unauthorized
      ) {
        router.push("/auth/signin");
      } else if (res[`${name}`].error?.code === errorCode.ConstraintViolation) {
        errorToast("空ではないボリュームは削除できません.");
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
