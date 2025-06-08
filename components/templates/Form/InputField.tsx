import { buildClassName } from "@/lib/class-name";
import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  error?: string;
  className?: string;
}>;

export const InputField = ({ children, error, className }: Props) => {
  return (
    <div className={className}>
      <div
        className={buildClassName(
          "grow flex flex-row items-center border-b",
          error ? "border-alert" : "border-foreground",
          "border-solid gap-2 px-2 pb-1"
        )}
      >
        {children}
      </div>
      {error && <p className="text-xs text-alert">{error}</p>}
    </div>
  );
};
