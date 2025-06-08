import { buildClassName } from "@/lib/class-name";
import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export const FormField = ({ children, className }: Props) => {
  return (
    <div className={buildClassName("grow flex flex-col gap-6", className)}>
      {children}
    </div>
  );
};
