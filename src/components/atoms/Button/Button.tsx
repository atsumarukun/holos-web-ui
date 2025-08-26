import { ComponentProps } from "react";
import { ButtonVariant, buttonVariants } from "./styles";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  label: string;
  icon?: IconType;
  variant?: ButtonVariant;
}> &
  ComponentProps<"button">;

export const Button = ({
  label,
  icon,
  variant,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(buttonVariants[variant ?? "default"], className)}
      {...props}
    >
      {icon && icon({ size: 16 })}
      {label}
    </button>
  );
};
