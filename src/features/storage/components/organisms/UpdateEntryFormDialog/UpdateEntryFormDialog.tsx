"use client";

import { InputField } from "@/components/molecules/InputField";
import { FormDialog } from "@/components/organisms/FormDialog";
import { updateEntry } from "@/features/storage/actions/update-entry";
import { buildKey } from "@/features/storage/lib/key";
import { errorCode } from "@/lib/errors";
import { errorToast, successToast } from "@/lib/toast";
import { refetchContext } from "@/providers/refetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const updateEntryFormSchema = z.object({
  name: z
    .string()
    .min(1, "必須項目です.")
    .max(255, "255文字以下にしてください.")
    .regex(
      /^[A-Za-z0-9!@#$%^&()_\-+=\[\]{};',.~ ]*$/,
      '半角英数字と\\/:*?"<>|を除く記号のみ利用できます.',
    ),
});
type UpdateEntryInput = z.infer<typeof updateEntryFormSchema>;

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
  defaultValues: UpdateEntryInput;
  open: boolean;
  onOpenChange: () => void;
}>;

export const UpdateEntryFormDialog = ({
  volumeName,
  currentKey,
  open,
  defaultValues,
  onOpenChange,
}: Props) => {
  const router = useRouter();
  const context = useContext(refetchContext);

  const [conflictError, setConflictError] = useState<string | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateEntryFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<UpdateEntryInput> = async (data) => {
    const { error } = await updateEntry(
      volumeName,
      buildKey(currentKey, defaultValues.name),
      { ...data, key: buildKey(currentKey, data.name) },
    );
    if (!error) {
      successToast("エントリーを更新しました.");
      context.refetch();
      reset();
      setConflictError(undefined);
      onOpenChange();
    } else {
      if (
        error.code === errorCode.Unauthenticated ||
        error.code === errorCode.Unauthorized
      ) {
        router.push("/auth/signin");
      } else if (error.code === errorCode.Duplicate) {
        setConflictError("エントリー名がすでに利用されています.");
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
      <InputField
        id="name"
        label="エントリー名"
        registerReturn={register("name")}
        error={conflictError ?? errors.name?.message}
        isRequired
      />
    </FormDialog>
  );
};
