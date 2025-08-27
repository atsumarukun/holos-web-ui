import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { InputVariant, inputVariants } from "./styles";
import { ComponentProps } from "react";

type Props = {
  id: string;
  placeholder: string;
  variant?: InputVariant;
  icon: IconType;
} & ComponentProps<"input">;

export const Input = ({
  id,
  placeholder,
  variant = "default",
  className,
  icon,
  ...props
}: Props) => {
  return (
    <div className={cn(inputVariants[variant].field, className)}>
      <label htmlFor={id}>{icon({ size: 18 })}</label>
      <input
        id={id}
        placeholder={placeholder}
        className={cn(
          "grow focus:outline-none text-foreground",
          inputVariants[variant].placeholder
        )}
        {...props}
      />
    </div>
  );
};
