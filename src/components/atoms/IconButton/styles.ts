import { cn } from "@/lib/utils";

const base = "p-2 rounded-full focus:outline-none";

export const iconButtonVariants = {
  default: cn(base, "bg-primary text-primary-foreground hover:bg-primary/90"),
  outline: cn(
    base,
    "border bg-inherit hover:bg-accent hover:text-accent-foreground"
  ),
  ghost: cn(base, "bg-inherit hover:bg-accent hover:text-accent-foreground"),
} as const;

export type IconButtonVariant = keyof typeof iconButtonVariants;
