import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { LuCloudOff } from "react-icons/lu";

type Props = Readonly<{
  title: string;
  description?: string;
  className?: string;
  icon?: IconType;
}>;

export const Error = ({ title, description, className, icon }: Props) => {
  return (
    <div
      className={cn(
        "grow flex flex-col items-center justify-center gap-6",
        className
      )}
    >
      <div className="bg-background text-[#999999] rounded-full p-12">
        {icon ? icon({ size: 56 }) : LuCloudOff({ size: 56 })}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl">{title}</p>
        {description && <p className="text-sm text-[#999999]">{description}</p>}
      </div>
    </div>
  );
};
