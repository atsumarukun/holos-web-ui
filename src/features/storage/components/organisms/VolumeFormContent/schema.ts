import { z } from "zod";

export const volumeFormSchema = z.object({
  name: z
    .string()
    .min(1, "必須項目です.")
    .max(255, "255文字以下にしてください.")
    .regex(
      /^[A-Za-z0-9!@#$%^&()_\-+=\[\]{};',.~ ]*$/,
      '半角英数字と\\/:*?"<>|を除く記号のみ利用できます.'
    ),
  isPublic: z.boolean(),
});

export type VolumeInput = z.infer<typeof volumeFormSchema>;
