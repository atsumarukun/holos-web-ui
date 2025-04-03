import { z } from "zod";
import { signupSchema } from "./signup";

export const signinSchema = signupSchema.pick({
  name: true,
  password: true,
});

export type Signin = z.infer<typeof signinSchema>;
