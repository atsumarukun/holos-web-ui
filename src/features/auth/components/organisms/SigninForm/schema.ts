import { z } from "zod";

export const signinFormSchema = z.object({
  accountName: z.string().min(1, "必須項目です."),
  password: z.string().min(1, "必須項目です."),
});

export type SigninInput = z.infer<typeof signinFormSchema>;
