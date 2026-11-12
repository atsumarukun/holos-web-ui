import { Header } from "@/components/organisms/Header";
import { Menu } from "@/components/organisms/Menu";
import { AccountProvider } from "@/providers/account";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const WorkspaceLayout = async ({ children }: Props) => {
  const accountName = (await headers()).get("account-name");

  if (!accountName) {
    redirect("/auth/signin");
  }

  return (
    <AccountProvider accountName={accountName}>
      <div className="h-[100dvh] flex flex-col">
        <Header />
        <div className="flex-1 min-h-0 flex flex-row">
          <aside className="hidden md:block w-[260px]">
            <Menu />
          </aside>
          <main className="flex-1 min-w-0 min-h-0 flex flex-col md:bg-secondary py-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AccountProvider>
  );
};
