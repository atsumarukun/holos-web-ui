import { BaseSyntheticEvent, ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}>;

export const Form = ({ children, className, onSubmit }: Props) => {
  return (
    <form
      className={
        "w-full grow flex flex-col gap-10" + (className ? " " + className : "")
      }
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
