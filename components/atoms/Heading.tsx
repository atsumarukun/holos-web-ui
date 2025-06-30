import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Heading = ({ children }: Props) => {
  return <h1 className="w-fit text-2xl font-normal">{children}</h1>;
};
