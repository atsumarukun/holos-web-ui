import { z } from "zod";

export const errorSchema = z.object({
  message: z.string().min(1, "エラーメッセージがありません."),
});

export type Error = z.infer<typeof errorSchema>;
