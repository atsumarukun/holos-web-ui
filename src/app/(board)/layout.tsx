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
    <AccountProvider accountName={accountName}>{children}</AccountProvider>
  );
}
