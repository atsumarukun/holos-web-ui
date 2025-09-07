import { cn } from "@/lib/utils";

type Props = Readonly<{
  text: string;
  className?: string;
}>;

export const Alert = ({ text, className }: Props) => {
  return (
    <div
      className={cn(
        "bg-destructive/10 border border-destructive/50 rounded",
        "text-center p-3",
        className
      )}
    >
      <p>{text}</p>
    </div>
  );
};
