import { cn } from "@/lib/utils";

const base = "border-2 focus:outline-none rounded px-2 py-0.5";

export const inputVariants = {
  default: cn(base, "bg-inherit border-border"),
  destructive: cn(base, "border-destructive/50 bg-destructive/10"),
};

export type InputVariant = keyof typeof inputVariants;
