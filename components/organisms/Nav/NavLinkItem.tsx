import { buildClassName } from "@/lib/class-name";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type Props = {
  floor: {
    name: string;
    href: string;
    icon: IconType;
  };
  onAccess?: () => void;
};

export const NavLinkItem = ({ floor, onAccess }: Props) => {
  const pathName = usePathname();

  return (
    <Link
      href={floor.href}
      className={buildClassName(
        "inline-block w-full font-normal hover:no-underline hover:bg-hover py-2",
        pathName == floor.href
          ? "border-l-4 border-theme bg-hover px-3 md:px-5"
          : "px-4 md:px-6"
      )}
      onClick={onAccess}
    >
      <div className="flex flex-row items-center gap-4">
        <floor.icon className="w-6 h-6 text-foreground bg-[rgba(229,124,221,0.5)] rounded p-1" />
        <p>{floor.name}</p>
      </div>
    </Link>
  );
};
