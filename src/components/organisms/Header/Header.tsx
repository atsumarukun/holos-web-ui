"use client";

import { Avatar } from "@/components/atoms/Avatar";
import { IconButton } from "@/components/atoms/IconButton";
import { Logo } from "@/components/atoms/Logo";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { signout } from "@/features/auth/actions/signout";
import { errorToast, successToast } from "@/lib/toast";
import { accountContext } from "@/providers/account";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { Menu } from "../Menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Header = () => {
  const router = useRouter();
  const context = useContext(accountContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignout = async () => {
    const res = await signout();
    if (res.success) {
      successToast("ログアウトしました.");
    } else {
      errorToast();
    }
    router.push("/auth/signin");
  };

  return (
    <header className="flex flex-row bg-[#262C3C] px-6 py-3">
      <IconButton
        icon={LuMenu}
        variant="ghost"
        className="text-white block md:hidden -ml-3 mr-1"
        onClick={() => setIsOpen((v) => !v)}
      />
      <div className="md:w-[calc(260px-24px)]">
        <Link href="/">
          <Logo className="text-white" />
        </Link>
      </div>
      <div className="grow flex flex-row items-center justify-end md:justify-between gap-6">
        <Breadcrumb className="hidden md:block text-white border-l border-white pl-6" />
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
            <button className="focus:outline-none">
              <Avatar
                accountName={context.accountName}
                className="bg-[rgba(255,255,255,0.2)]"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 mr-6">
            <DropdownMenuLabel className="flex flex-row gap-1 items-center">
              {context.accountName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                className="flex flex-row items-center gap-1 hover:cursor-pointer"
                onClick={handleSignout}
              >
                <LuLogOut className="text-foreground" />
                ログアウト
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <MenuSheet open={isOpen} onOpenChange={() => setIsOpen((v) => !v)} />
    </header>
  );
};

const MenuSheet = ({
  open,
  onOpenChange,
}: Readonly<{ open: boolean; onOpenChange: () => void }>) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="gap-0">
        <SheetHeader className="flex flex-row gap-0 bg-[#262C3C] px-6 py-3">
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
          <IconButton
            icon={LuMenu}
            variant="ghost"
            className="text-white block md:hidden -ml-3 mr-1"
            onClick={onOpenChange}
          />
          <Link href="/">
            <Logo className="text-white" />
          </Link>
        </SheetHeader>
        <Menu />
      </SheetContent>
    </Sheet>
  );
};
