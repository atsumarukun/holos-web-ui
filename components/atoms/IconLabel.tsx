import { IconType } from "react-icons";

type Props = Readonly<{
  htmlFor: string;
  className?: string;
  icon: IconType;
}>;

export const IconLabel = ({ htmlFor, className, icon }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={"text-xl" + (className ? " " + className : "")}
    >
      {icon({ color: "inherit" })}
    </label>
  );
};
