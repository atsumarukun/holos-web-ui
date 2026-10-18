import { cn } from "@/lib/utils";

type Props = Readonly<{
  text: string;
  className?: string;
}>;

export const Heading = ({ text, className }: Props) => {
  return (
    <h1 className={cn("text-lg md:text-2xl font-medium", className)}>{text}</h1>
  );
};
