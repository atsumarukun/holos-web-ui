import { cn } from "@/lib/utils";

type Props = Readonly<{
  accountName: string;
  className?: string;
}>;

export const Avatar = ({ accountName, className }: Props) => {
  return (
    <div
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white",
        className
      )}
    >
      <p className="font-bold">{accountName[0].toUpperCase()}</p>
    </div>
  );
};
