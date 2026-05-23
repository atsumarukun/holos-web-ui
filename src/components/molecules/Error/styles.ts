import { cn } from "@/lib/utils";

const base = "text-[#999999] rounded-full p-12";

export const errorVariants = {
  page: cn(base, "bg-background"),
  dialog: cn(base, "bg-secondary"),
} as const;

export type ErrorVariant = keyof typeof errorVariants;
