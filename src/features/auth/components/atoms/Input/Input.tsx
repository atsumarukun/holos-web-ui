import { cn } from "@/lib/utils";
import { InputVariant, inputVariants } from "./styles";
import { ComponentProps } from "react";

type Props = Readonly<
  {
    id: string;
    placeholder: string;
    variant?: InputVariant;
  } & ComponentProps<"input">
>;

export const Input = ({
  id,
  placeholder,
  variant = "default",
  className,
  ...props
}: Props) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className={cn(
        "w-full focus:outline-none text-foreground",
        inputVariants[variant],
        className
      )}
      {...props}
    />
  );
};
