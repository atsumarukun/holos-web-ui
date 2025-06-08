import { buildClassName } from "@/lib/class-name";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const SubmitButton = ({ children, className }: Props) => {
  return (
    <button
      type="submit"
      className={buildClassName(
        "relative w-fit bg-button rounded-full px-8 py-2",
        className
      )}
    >
      <span className="absolute inset-0 hover:bg-hover rounded-full" />
      {children}
    </button>
  );
};
