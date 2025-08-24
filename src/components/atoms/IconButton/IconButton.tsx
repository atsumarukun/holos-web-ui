import { ComponentProps } from "react";
import { IconType } from "react-icons";
import { IconButtonVariant, iconButtonVariants } from "./variants";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  icon: IconType;
  variant?: IconButtonVariant;
}> &
  ComponentProps<"button">;

export const IconButton = ({ icon, variant, className, ...props }: Props) => {
  return (
    <button
      className={cn(iconButtonVariants[variant ?? "default"], className)}
      {...props}
    >
      {icon({ size: 16 })}
    </button>
  );
};
