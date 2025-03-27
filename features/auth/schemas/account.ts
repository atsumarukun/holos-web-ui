import { z } from "zod";
import { signupSchema } from "./signup";

export const accountSchema = signupSchema.pick({
  name: true,
});

export type Account = z.infer<typeof accountSchema>;
