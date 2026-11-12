import { WorkspaceLayout } from "@/components/layouts/WorkspaceLayout";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
}
