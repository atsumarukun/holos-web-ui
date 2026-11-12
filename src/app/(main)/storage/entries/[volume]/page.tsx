import { EntryListTemplate } from "@/features/storage/components/templates/EntryListTemplate";

export default async function EntryListPage({
  params,
}: Readonly<{ params: Promise<{ volume: string }> }>) {
  const { volume } = await params;

  return <EntryListTemplate volumeName={volume} currentKey="" />;
}
