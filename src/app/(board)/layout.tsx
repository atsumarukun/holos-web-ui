import { Header } from "@/components/organisms/Header";
import { Menu } from "@/components/organisms/Menu";
import { AccountProvider } from "@/providers/account";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accountName = (await headers()).get("account-name");

  if (!accountName) {
    redirect("/auth/signin");
  }

  return (
    <AccountProvider accountName={accountName}>
      <div className="h-[100dvh] flex flex-col">
        <Header />
        <div className="flex-1 min-h-0 flex flex-row">
          <div className="hidden md:block w-[260px]">
            <Menu />
          </div>
          <div className="flex-1 min-w-0 min-h-0 flex flex-col md:bg-secondary py-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    </AccountProvider>
  );
}
