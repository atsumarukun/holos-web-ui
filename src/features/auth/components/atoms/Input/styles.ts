import { cn } from "@/lib/utils";

const base = cn("flex flex-row items-center gap-1 px-2", "border-b");

export const inputVariants = {
  default: {
    field: cn(base, "border-border text-foreground"),
    placeholder: "",
  },
  destructive: {
    field: cn(base, "border-destructive text-destructive"),
    placeholder: "placeholder-destructive/50",
  },
};

export type InputVariant = keyof typeof inputVariants;
