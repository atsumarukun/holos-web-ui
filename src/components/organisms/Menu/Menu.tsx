"use client";

import Link from "next/link";
import { Floor, floors } from "./constant";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Menu = () => {
  const path = usePathname();
  return (
    <nav className="text-sm">
      <Accordion type="single" collapsible>
        {floors.map((floor) => (
          <MenuItem floor={floor} currentPath={path} key={floor.key} />
        ))}
      </Accordion>
    </nav>
  );
};

const MenuItem = ({
  floor,
  currentPath,
}: Readonly<{ floor: Floor; currentPath: string }>) => {
  if ("path" in floor) {
    return (
      <Link
        href={floor.path}
        className={cn(
          "flex flex-row items-center gap-3 hover:bg-accent py-3 pr-6",
          floor.path === currentPath
            ? "bg-accent border-l-4 border-[#fe5dd8] pl-5"
            : "pl-6"
        )}
      >
        <floor.icon className="w-6 h-6 rounded text-[#fe5dd8] bg-[#fe5dd8]/24 p-1" />
        {floor.name}
      </Link>
    );
  }

  return (
    <AccordionItem value={floor.key} className="border-0">
      <AccordionTrigger className="font-normal hover:no-underline items-center hover:bg-accent py-3 px-6">
        <span className="flex flex-row gap-3">
          <floor.icon className="w-6 h-6 rounded text-[#fe5dd8] bg-[#fe5dd8]/24 p-1" />
          {floor.name}
        </span>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col">
        {floor.children.map((child) => (
          <Link
            href={child.path}
            className={cn(
              "hover:bg-accent py-3 pr-6",
              child.path === currentPath
                ? "bg-accent border-l-4 border-[#fe5dd8] pl-14"
                : "pl-15"
            )}
            key={child.path}
          >
            {child.name}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
