import { cn } from "@/lib/utils";
import Image from "next/image";
import { Size, sizes } from "./styles";

type Props = Readonly<{
  size?: Size;
  noIcon?: boolean;
}>;

export const Logo = ({ size = "base", noIcon }: Props) => {
  return (
    <div className="flex flex-row items-center">
      {!noIcon && (
        <Image
          src="/logo.png"
          alt="ロゴ"
          width={sizes[size].image}
          height={sizes[size].image}
        />
      )}
      <p className={cn("font-playwrite mt-1", sizes[size].label)}>
        H<span className="text-[#fe5dd8]">o</span>los
      </p>
    </div>
  );
};
