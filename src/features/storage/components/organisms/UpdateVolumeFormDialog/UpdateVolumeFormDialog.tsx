"use client";

import { useContext, useState } from "react";
import {
  VolumeFormContent,
  volumeFormSchema,
  VolumeInput,
} from "../VolumeFormContent";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVolume } from "@/features/storage/actions/update-volume";
import { errorToast, successToast } from "@/lib/toast";
import { FormDialog } from "@/components/organisms/FormDialog";
import { refetchContext } from "@/providers/refetch";

type Props = Readonly<{
  defaultValues: VolumeInput;
  open: boolean;
  onOpenChange: () => void;
}>;

export const UpdateVolumeFormDialog = ({
  defaultValues,
  open,
  onOpenChange,
}: Props) => {
  const context = useContext(refetchContext);

  const [conflictError, setConflictError] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(volumeFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<VolumeInput> = async (data) => {
    const res = await updateVolume(defaultValues.name, data);
    if (res.success) {
      successToast("ボリュームを更新しました.");
      reset();
      context.refetch();
      onOpenChange();
    } else {
      if (res.error) {
        setConflictError(res.error);
      } else {
        errorToast();
      }
    }
  };

  return (
    <FormDialog
      title={`「${defaultValues.name}」を編集`}
      submitLabel="更新"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit(onSubmit)}
    >
      <VolumeFormContent
        control={control}
        register={register}
        errors={errors}
        conflictError={conflictError}
      />
    </FormDialog>
  );
};
