import { ComponentProps } from "react";
import { IconType } from "react-icons";
import { IconLabelVariant, iconLabelVariants } from "./styles";
import { cn } from "@/lib/utils";

type Props = {
  htmlFor: string;
  variant?: IconLabelVariant;
  icon: IconType;
} & ComponentProps<"label">;

export const IconLabel = ({
  htmlFor,
  variant = "default",
  className,
  icon,
  ...props
}: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(iconLabelVariants[variant], className)}
      {...props}
    >
      {icon({ size: 18 })}
    </label>
  );
};
