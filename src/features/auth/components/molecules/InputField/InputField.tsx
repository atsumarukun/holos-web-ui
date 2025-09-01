import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { IconLabel } from "../../atoms/IconLabel";
import { Input } from "../../atoms/Input";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = Readonly<{
  id: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  registerReturn: UseFormRegisterReturn;
  icon: IconType;
}>;

export const InputField = ({
  id,
  placeholder,
  type,
  error,
  registerReturn,
  icon,
}: Props) => {
  return (
    <div>
      <div
        className={cn(
          "flex flex-row items-center gap-2 px-2",
          "border-b",
          error ? "border-destructive mb-0" : "border-border mb-4"
        )}
      >
        <IconLabel
          htmlFor={id}
          icon={icon}
          variant={error ? "destructive" : "default"}
        />
        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          variant={error ? "destructive" : "default"}
          {...registerReturn}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
