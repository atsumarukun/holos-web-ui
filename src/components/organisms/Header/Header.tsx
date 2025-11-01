"use client";

import { Avatar } from "@/components/atoms/Avatar";
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
import { signout } from "@/features/auth/actions/signout";
import { errorToast } from "@/lib/toast";
import { accountContext } from "@/providers/account";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import { getToken } from "@/actions/token";

export const Header = () => {
  const router = useRouter();
  const context = useContext(accountContext);

  const handleSignout = async () => {
    const token = await getToken();
    if (token) {
      const res = await signout(token);
      if (res.success) {
        router.push("/auth/signin");
      } else {
        errorToast();
      }
    }
  };

  return (
    <header className="flex flex-row bg-[#262C3C] px-6 py-3">
      <div className="w-[calc(260px-24px)]">
        <Link href="/">
          <Logo className="text-white" />
        </Link>
      </div>
      <div className="grow flex flex-row items-center justify-between gap-6">
        <Breadcrumb className="text-white border-l border-white pl-6" />
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
    </header>
  );
};
