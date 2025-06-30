import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildClassName } from "@/lib/class-name";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type Props = {
  floor: {
    key: string;
    name: string;
    children: {
      name: string;
      ruby: string;
      href: string;
    }[];
    icon: IconType;
  };
};

export const NavAccordionItem = ({ floor }: Props) => {
  const pathName = usePathname();
  const hrefs = floor.children.map((v) => v.href);

  return (
    <AccordionItem value={floor.key} className="border-0">
      <AccordionTrigger
        className={buildClassName(
          "font-normal hover:no-underline hover:bg-hover rounded-none py-2",
          hrefs.includes(pathName)
            ? "border-l-4 border-theme bg-hover px-5"
            : "px-6"
        )}
      >
        <div className="flex flex-row items-center gap-4">
          <floor.icon className="w-6 h-6 text-foreground bg-[rgba(229,124,221,0.5)] rounded p-1" />
          <p>{floor.name}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col border-l border-base p-0 ml-9">
        {floor.children.map((child, i) => (
          <Link href={child.href} key={i} className="hover:bg-hover px-4 py-2">
            {child.name}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
