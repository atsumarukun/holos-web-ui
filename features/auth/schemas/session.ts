import { z } from "zod";

export const sessionSchema = z.object({
  token: z.string().min(1, "セッショントークンは必須です."),
});

export type Session = z.infer<typeof sessionSchema>;
