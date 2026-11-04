import { Error } from "@/components/molecules/Error";
import { Header } from "@/components/organisms/Header";
import { Menu } from "@/components/organisms/Menu";
import { AccountProvider } from "@/providers/account";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotFound() {
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
          <main className="flex-1 min-w-0 min-h-0 flex flex-col md:bg-secondary py-4 md:p-6">
            <Error
              variant="page"
              title="ページが存在しません"
              description="お探しのページは移動または削除された可能性があります."
            />
          </main>
        </div>
      </div>
    </AccountProvider>
  );
}
