import { cn } from "@/lib/utils";
import Image from "next/image";
import { LogoSize, logoSizes } from "./styles";
import logo from "@/assets/logo.png";

type Props = Readonly<{
  size?: LogoSize;
  noIcon?: boolean;
  className?: string;
}>;

export const Logo = ({ size = "base", noIcon, className }: Props) => {
  return (
    <div className={cn("flex flex-row items-center", className)}>
      {!noIcon && (
        <Image
          src={logo}
          alt="ロゴ"
          width={logoSizes[size].image}
          height={logoSizes[size].image}
        />
      )}
      <p className={cn("font-playwrite mt-1", logoSizes[size].label)}>
        H<span className="text-theme">o</span>los
      </p>
    </div>
  );
};
