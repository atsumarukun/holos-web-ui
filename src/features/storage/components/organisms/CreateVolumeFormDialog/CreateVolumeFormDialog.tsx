"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  VolumeFormContent,
  volumeFormSchema,
  VolumeInput,
} from "../VolumeFormContent";
import { createVolume } from "@/features/storage/actions/create-volume";
import { errorToast, successToast } from "@/lib/toast";
import { FormDialog } from "@/components/organisms/FormDialog";
import { refetchContext } from "@/providers/refetch";
import { status } from "@/lib/errors";

type Props = Readonly<{
  open: boolean;
  onOpenChange: () => void;
}>;

export const CreateVolumeFormDialog = ({ open, onOpenChange }: Props) => {
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
    defaultValues: { isPublic: false },
  });

  const onSubmit: SubmitHandler<VolumeInput> = async (data) => {
    const res = await createVolume(data);
    if (res.data) {
      successToast("ボリュームを作成しました.");
      context.refetch();
      reset();
      setConflictError("");
      onOpenChange();
    } else if (res.error?.status === status.Conflict) {
      setConflictError("ボリューム名がすでに利用されています.");
    } else {
      errorToast();
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
