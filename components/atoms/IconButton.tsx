import { IconType } from "react-icons";

type Props = Readonly<{
  className?: string;
  icon: IconType;
  onClick: () => void;
}>;

export const IconButton = ({ className, icon, onClick }: Props) => {
  return (
    <button
      className={
        "rounded-full hover:bg-hover text-2xl p-2" +
        (className ? " " + className : "")
      }
      onClick={onClick}
    >
      {icon({})}
    </button>
  );
};
