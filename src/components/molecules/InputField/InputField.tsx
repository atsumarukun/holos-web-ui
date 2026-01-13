import { Input } from "@/components/atoms/Input";
import { RequiredBadge } from "@/components/atoms/RequiredBadge";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = Readonly<{
  id: string;
  label: string;
  isRequired?: boolean;
  error?: string;
  registerReturn: UseFormRegisterReturn;
}>;

export const InputField = ({
  id,
  label,
  isRequired,
  error,
  registerReturn,
  ...inputProps
}: Props) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-row items-center gap-2">
        <label htmlFor={id}>{label}</label>
        {isRequired && <RequiredBadge />}
      </div>
      <div className={error ? undefined : "mb-4"}>
        <Input
          id={id}
          variant={error ? "destructive" : "default"}
          className="w-full"
          {...inputProps}
          {...registerReturn}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
};
