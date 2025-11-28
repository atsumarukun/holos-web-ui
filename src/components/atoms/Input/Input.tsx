import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { InputVariant, inputVariants } from "./styles";

type Props = Readonly<
  {
    id: string;
    variant?: InputVariant;
  } & ComponentProps<"input">
>;

export const Input = ({
  id,
  variant = "default",
  className,
  ...props
}: Props) => {
  return (
    <input
      id={id}
      className={cn(inputVariants[variant], className)}
      {...props}
    />
  );
};
