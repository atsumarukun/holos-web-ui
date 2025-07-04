import { buildClassName } from "@/lib/class-name";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = Readonly<
  {
    id: string;
    placeholder: string;
    type?: string;
    className?: string;
  } & UseFormRegisterReturn
>;

export const Input = ({
  id,
  placeholder,
  type,
  className,
  ...props
}: Props) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      className={buildClassName(
        "grow bg-inherit focus:outline-none",
        className
      )}
      {...props}
    />
  );
};
