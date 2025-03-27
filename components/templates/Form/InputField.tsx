import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

type Props = Readonly<{
  children: ReactNode;
  error?: FieldError;
  className?: string;
}>;

export const InputField = ({ children, error, className }: Props) => {
  return (
    <div className={className}>
      <div
        className={`grow flex flex-row items-center border-b ${
          error ? "border-alert" : "border-foreground"
        } border-solid gap-2 px-2 pb-1`}
      >
        {children}
      </div>
      {error && <p className="text-xs text-alert">{error?.message}</p>}
    </div>
  );
};
