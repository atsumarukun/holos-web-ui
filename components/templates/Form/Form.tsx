import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  onSubmit: SubmitHandler<any>;
}>;

export const Form = ({ children, className, onSubmit }: Props) => {
  return (
    <form
      className={
        "w-full grow flex flex-col gap-10" + (className ? " " + className : "")
      }
    >
      {children}
    </form>
  );
};
