import { Header } from "@/components/organisms/Header";
import { Nav } from "@/components/organisms/Nav";
import { buildClassName } from "@/lib/class-name";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await headers();
  const accountName = header.get("account-name") ?? "";

  return (
    <>
      <div className="block md:hidden">
        <Header accountName={accountName} />
      </div>
      <div className="h-full flex flex-row">
        <div className="h-full md:flex flex-col justify-between hidden">
          <Link
            href="/"
            className={buildClassName(
              "w-full inline-block font-playwrite text-xl px-6 py-4 mt-2 mb-6"
            )}
          >
            H<span className="text-theme">o</span>los
          </Link>
          <Nav className="w-72" />
          <div className="border-t border-separator">
            <button className="w-full text-lg text-left font-normal px-6 py-4">
              {accountName}
            </button>
          </div>
        </div>
        <div className="grow md:bg-[rgba(0,0,0,0.05)] md:dark:bg-[rgba(255,255,255,0.05)] pt-14 md:pt-0">
          {children}
        </div>
      </div>
    </>
  );
}
