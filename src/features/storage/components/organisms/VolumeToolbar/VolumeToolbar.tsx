"use client";

import { Button } from "@/components/atoms/Button";
import { SearchBox } from "@/components/molecules/SearchBox";
import { FormDialog } from "@/components/organisms/FormDialog";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import {
  VolumeFormContent,
  volumeFormSchema,
  VolumeInput,
} from "../VolumeFormContent";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVolume } from "@/features/storage/actions/create-volume";
import { errorToast, successToast } from "@/lib/toast";

type Props = Readonly<{
  refetch: () => void;
}>;

export const VolumeToolbar = ({ refetch }: Props) => {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } else {
      if (res.error) {
        setConflictError(res.error);
      } else {
        errorToast();
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between gap-6">
        <SearchBox />
        <Button
          icon={LuPlus}
          label="作成"
          className="whitespace-nowrap"
          onClick={() => setOpen(true)}
        />
      </div>
      <FormDialog
        title="ボリューム作成"
        submitLabel="作成"
        open={open}
        onOpenChange={() => setOpen((v) => !v)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <VolumeFormContent
          control={control}
          register={register}
          errors={errors}
          conflictError={conflictError}
        />
      </FormDialog>
    </>
  );
};
