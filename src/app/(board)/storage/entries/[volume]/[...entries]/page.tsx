import { EntryListTemplate } from "@/features/storage/components/templates/EntryListTemplate";

export default async function EntryPage({
  params,
}: Readonly<{ params: Promise<{ volume: string; entries: string[] }> }>) {
  const { volume, entries } = await params;
  const entryKey = entries.join("/");

  return <EntryListTemplate volumeName={volume} currentKey={entryKey} />;
}
