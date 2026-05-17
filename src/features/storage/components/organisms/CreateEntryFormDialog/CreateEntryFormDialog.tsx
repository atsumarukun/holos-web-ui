"use client";

import { InputField } from "@/components/molecules/InputField";
import { FormDialog } from "@/components/organisms/FormDialog";
import { createEntry } from "@/features/storage/actions/create-entry";
import { errorCode } from "@/lib/errors";
import { errorToast, successToast } from "@/lib/toast";
import { refetchContext } from "@/providers/refetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import z from "zod";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

const createEntryFormSchema = z.object({
  name: z
    .string()
    .min(1, "必須項目です.")
    .max(255, "255文字以下にしてください.")
    .regex(
      /^[A-Za-z0-9!@#$%^&()_\-+=\[\]{};',.~ ]*$/,
      '半角英数字と\\/:*?"<>|を除く記号のみ利用できます.',
    ),
  file: z.instanceof(File, { message: "不正なファイルです." }).optional(),
});
type CreateEntryInput = z.infer<typeof createEntryFormSchema>;

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
  open: boolean;
  onOpenChange: () => void;
}>;

export const CreateEntryFormDialog = ({
  volumeName,
  currentKey,
  open,
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
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEntryFormSchema),
  });

  const name = watch("name");
  const file = watch("file");

  const onSubmit: SubmitHandler<CreateEntryInput> = async (data) => {
    const { error } = await createEntry(volumeName, {
      ...data,
      key: currentKey + "/" + data.name,
    });
    if (!error) {
      successToast("エントリーを作成しました.");
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

  const onDrop = (files: File[]) => {
    setValue("file", files[0], { shouldValidate: true });
    if (!name) {
      setValue("name", files[0].name, { shouldValidate: true });
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: onDropzoneOpen,
  } = useDropzone({ multiple: false, noClick: true, onDrop: onDrop });

  return (
    <FormDialog
      title="エントリー作成"
      submitLabel="作成"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <InputField
          id="name"
          label="エントリー名"
          registerReturn={register("name")}
          error={conflictError ?? errors.name?.message}
          isRequired
        />
        <div className="flex flex-col gap-0.5">
          <p>ファイル{file ? `: ${file.name}` : ""}</p>
          <div className={errors.file?.message ? undefined : "mb-4"}>
            <div
              {...getRootProps()}
              className={cn(
                "border rounded flex flex-col items-center gap-2 py-8",
                errors.file?.message
                  ? "bg-destructive/10 border-destructive/50"
                  : isDragActive
                    ? "bg-secondary"
                    : "bg-inherit border-border",
              )}
            >
              <input {...getInputProps()} />
              <p>
                {isDragActive
                  ? "ファイルをドロップしてください."
                  : "ファイルをドラッグ&ドロップしてください."}
              </p>
              <Button
                label="ファイルを選択"
                type="button"
                className="w-fit"
                onClick={onDropzoneOpen}
              />
            </div>
            {errors.file?.message && (
              <p className="text-xs text-destructive">{errors.file.message}</p>
            )}
          </div>
        </div>
      </div>
    </FormDialog>
  );
};
