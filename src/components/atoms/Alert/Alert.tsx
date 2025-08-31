import { cn } from "@/lib/utils";

type Props = Readonly<{
  text: string;
}>;

export const Alert = ({ text }: Props) => {
  return (
    <div
      className={cn(
        "bg-destructive/10 border border-destructive/50 rounded",
        "text-center p-3"
      )}
    >
      <p>{text}</p>
    </div>
  );
};
