import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { LuCloudOff } from "react-icons/lu";
import { ErrorVariant, errorVariants } from "./styles";

type Props = Readonly<{
  variant: ErrorVariant;
  title: string;
  description?: string;
  className?: string;
  icon?: IconType;
}>;

export const Error = ({
  variant,
  title,
  description,
  className,
  icon,
}: Props) => {
  return (
    <div
      className={cn(
        "grow flex flex-col items-center justify-center gap-6",
        className,
      )}
    >
      <div className={errorVariants[variant]}>
        {icon ? icon({ size: 56 }) : LuCloudOff({ size: 56 })}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl">{title}</p>
        {description && <p className="text-sm text-[#999999]">{description}</p>}
      </div>
    </div>
  );
};
