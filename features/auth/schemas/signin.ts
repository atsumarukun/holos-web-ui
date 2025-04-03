import { z } from "zod";

export const signinSchema = z.object({
  accountName: z.string().min(1, "アカウント名を入力してください."),
  password: z.string().min(1, "パスワードを入力してください."),
});

export type Signin = z.infer<typeof signinSchema>;
