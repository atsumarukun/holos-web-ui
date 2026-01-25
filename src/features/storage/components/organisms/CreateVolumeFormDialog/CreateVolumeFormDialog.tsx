"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  VolumeFormContent,
  volumeFormSchema,
  VolumeInput,
} from "../VolumeFormContent";
import { createVolume } from "@/features/storage/actions/create-volume";
import { errorToast, successToast } from "@/lib/toast";
import { FormDialog } from "@/components/organisms/FormDialog";

type Props = Readonly<{
  open: boolean;
  onOpenChange: () => void;
  refetch: () => void;
}>;

export const CreateVolumeFormDialog = ({
  open,
  onOpenChange,
  refetch,
}: Props) => {
  const [conflictError, setConflictError] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(volumeFormSchema),
    defaultValues: { isPublic: false },
  });

  const onSubmit: SubmitHandler<VolumeInput> = async (data) => {
    const res = await createVolume(data);
    if (res.success) {
      successToast("ボリュームを作成しました.");
      reset();
      refetch();
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
      title="ボリューム作成"
      submitLabel="作成"
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
