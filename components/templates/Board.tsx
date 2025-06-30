import { buildClassName } from "@/lib/class-name";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Board = ({ children, className }: Props) => {
  return (
    <div className={buildClassName("bg-background rounded-xl", className)}>
      {children}
    </div>
  );
};
