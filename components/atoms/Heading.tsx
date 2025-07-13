import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Heading = ({ children }: Props) => {
  return (
    <h1 className="w-fit text-xl md:text-2xl font-light md:font-normal">
      {children}
    </h1>
  );
};
