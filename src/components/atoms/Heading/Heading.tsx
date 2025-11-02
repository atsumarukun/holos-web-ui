import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = Readonly<{
  text: string;
  className?: string;
}>;

export const Heading = ({ text, className }: Props) => {
  return <h1 className={cn("text-2xl font-medium", className)}>{text}</h1>;
};
