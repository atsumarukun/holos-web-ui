"use client";

import { buildClassName } from "@/lib/class-name";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { IconButton } from "../atoms/IconButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Nav } from "./Nav";

type Props = {
  accountName: string;
};

export const Header = ({ accountName }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed w-full flex flex-row items-center justify-between px-2 py-2">
      <div className="flex flex-row items-center gap-2">
        <IconButton icon={LuMenu} onClick={() => setOpen(true)} />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-full gap-6">
            <SheetHeader className="flex flex-row items-center justify-between px-2 py-2">
              <VisuallyHidden>
                <SheetTitle />
                <SheetDescription />
              </VisuallyHidden>
              <div className="flex flex-row items-center gap-2">
                <IconButton icon={MdClose} onClick={() => setOpen(false)} />
                <Link
                  href="/"
                  className={buildClassName(
                    "inline-block font-playwrite text-lg"
                  )}
                  onClick={() => setOpen(false)}
                >
                  H<span className="text-theme">o</span>los
                </Link>
              </div>
              <button className="p-2">{accountName}</button>
            </SheetHeader>
            <Nav onAccess={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className={buildClassName("inline-block font-playwrite text-lg")}
        >
          H<span className="text-theme">o</span>los
        </Link>
      </div>
      <button className="p-2">{accountName}</button>
    </header>
  );
};
