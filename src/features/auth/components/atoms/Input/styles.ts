import { cn } from "@/lib/utils";

const base = cn("flex flex-row items-center gap-1 px-2", "border-b");

export const inputVariants = {
  default: "placeholder-gray-400",
  destructive: "placeholder-destructive/50",
};

export type InputVariant = keyof typeof inputVariants;
