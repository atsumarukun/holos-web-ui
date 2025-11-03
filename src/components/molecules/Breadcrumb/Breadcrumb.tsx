"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useContext } from "react";
import { LuHouse } from "react-icons/lu";
import { MdChevronRight, MdMoreHoriz } from "react-icons/md";
import { breadcrumbContext } from "./provider";

type Props = Readonly<{
  className?: string;
}>;

export const Breadcrumb = ({ className }: Props) => {
  const context = useContext(breadcrumbContext);

  if (!context || !context.breadcrumbs.length) {
    return (
      <div className={cn("text-sm", className)}>
        <Link href="/">
          <LuHouse size={18} />
        </Link>
      </div>
    );
  }

  if (context.breadcrumbs.length <= 3) {
    return (
      <div
        className={cn("flex flex-row items-center gap-0.5 text-sm", className)}
      >
        <Link href="/">
          <LuHouse size={18} />
        </Link>
        <MdChevronRight size={18} className="mt-0.5" />
        {context.breadcrumbs
          .slice(0, context.breadcrumbs.length - 1)
          .map((breadcrumb) => (
            <div
              className="flex flex-row items-center gap-0.5"
              key={breadcrumb.href}
            >
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              <MdChevronRight size={18} className="mt-0.5" />
            </div>
          ))}
        <p>{context.breadcrumbs.at(-1)?.label}</p>
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-row items-center gap-0.5 text-sm", className)}
    >
      <Link href="/">
        <LuHouse size={18} />
      </Link>
      <MdChevronRight size={18} className="mt-0.5" />
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button>
            <MdMoreHoriz size={18} className="mt-0.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {context.breadcrumbs
            .slice(0, context.breadcrumbs.length - 2)
            .map((breadcrumb) => (
              <Link href={breadcrumb.href} key={breadcrumb.href}>
                <DropdownMenuItem className="hover:cursor-pointer">
                  {breadcrumb.label}
                </DropdownMenuItem>
              </Link>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <MdChevronRight size={18} className="mt-0.5" />
      <Link href={context.breadcrumbs[context.breadcrumbs.length - 2].href}>
        {context.breadcrumbs[context.breadcrumbs.length - 2].label}
      </Link>
      <MdChevronRight size={18} className="mt-0.5" />
      <p>{context.breadcrumbs.at(-1)?.label}</p>
    </div>
  );
};
