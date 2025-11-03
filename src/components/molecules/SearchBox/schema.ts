import { z } from "zod";

export const searchFormSchema = z.object({
  keyword: z.string(),
});

export type SearchInput = z.infer<typeof searchFormSchema>;
