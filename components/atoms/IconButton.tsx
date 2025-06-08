import { buildClassName } from "@/lib/class-name";
import { IconType } from "react-icons";

type Props = Readonly<{
  className?: string;
  icon: IconType;
  onClick: () => void;
}>;

export const IconButton = ({ className, icon, onClick }: Props) => {
  return (
    <button
      className={buildClassName(
        "rounded-full hover:bg-hover text-2xl p-2",
        className
      )}
      onClick={onClick}
    >
      {icon({})}
    </button>
  );
};
