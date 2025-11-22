import { cn } from "@/lib/utils";

const base = cn(
  "flex flex-row items-center gap-2 py-2 px-3",
  "text-sm rounded-full focus:outline-none"
);

export const buttonVariants = {
  default: cn(base, "bg-button text-primary-foreground hover:bg-button/80"),
  outline: cn(
    base,
    "border bg-inherit hover:bg-accent hover:text-accent-foreground"
  ),
  ghost: cn(base, "bg-inherit hover:bg-accent hover:text-accent-foreground"),
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
