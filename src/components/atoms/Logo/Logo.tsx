import { cn } from "@/lib/utils";
import Image from "next/image";
import { LogoSize, logoSizes } from "./styles";

type Props = Readonly<{
  size?: LogoSize;
  noIcon?: boolean;
}>;

export const Logo = ({ size = "base", noIcon }: Props) => {
  return (
    <div className="flex flex-row items-center">
      {!noIcon && (
        <Image
          src="/logo.png"
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
