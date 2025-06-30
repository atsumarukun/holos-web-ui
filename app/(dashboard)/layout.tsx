import { Nav } from "@/components/organisms/Nav";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await headers();
  const accountName = header.get("account-name") ?? "";

  return (
    <div className="h-full flex flex-row">
      <div className="h-full flex flex-col justify-between">
        <Nav />
        <div className="">
          <button className="w-full text-lg text-left font-normal border-t border-separator px-6 py-4">
            {accountName}
          </button>
        </div>
      </div>
      <div className="grow bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
        {children}
      </div>
    </div>
  );
}
