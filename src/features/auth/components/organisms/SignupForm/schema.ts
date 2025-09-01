import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(3, "3文字以上にしてください.")
    .max(24, "24文字以下にしてください.")
    .regex(
      /^[A-Za-z0-9_]*$/,
      "大文字, 小文字, 数字, アンダースコアのみ利用できます."
    ),
  password: z
    .string()
    .min(8, "8文字以上にしてください.")
    .max(72, "72文字以下にしてください.")
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|~]*$]*$/,
      "大文字, 小文字, 数字, 記号のみ利用できます."
    ),
  confirmPassword: z
    .string()
    .min(8, "8文字以上にしてください.")
    .max(72, "72文字以下にしてください.")
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|~]*$]*$/,
      "大文字, 小文字, 数字, 記号のみ利用できます."
    ),
});

export type SignupInput = z.infer<typeof signupFormSchema>;
