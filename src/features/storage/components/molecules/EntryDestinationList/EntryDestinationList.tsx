import { GetEntriesResponse } from "@/features/storage/actions/get-entries";
import { extractName } from "@/features/storage/lib/key";
import { useScrollbarWidthVariable } from "@/hooks/scrollbar-width";
import dayjs from "@/lib/dayjs";

type Props = Readonly<{
  entries: GetEntriesResponse["entries"];
  onSelect: (key: string) => void;
}>;

export const EntryDestinationList = ({ entries, onSelect }: Props) => {
  const { scrollbarRef } = useScrollbarWidthVariable({
    variableName: "--dialog-scrollbar-width",
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex border-b px-4 py-1.5">
        <p className="flex-1 lg:flex-[2]">エントリー名</p>
        <p className="flex-1">タイプ</p>
        <p className="lg:flex-1 hidden lg:block">最終更新日時</p>
      </div>
      <div
        ref={scrollbarRef}
        className="grow flex flex-col overflow-y-auto -mr-[var(--dialog-scrollbar-width)]"
      >
        {entries
          .filter((entry) => entry.type === "folder")
          .map((entry) => (
            <button
              onClick={() => onSelect(entry.key)}
              className="flex flex-row text-start hover:bg-accent border-b px-4 py-1.5"
              key={entry.key}
            >
              <p className="truncate flex-1 lg:flex-[2]">
                {extractName(entry.key)}
              </p>
              <p className="truncate flex-1 text-[#999999]">{entry.type}</p>
              <p className="lg:flex-1 hidden lg:block text-[#999999]">
                {dayjs(entry.updatedAt)
                  .tz("Asia/Tokyo")
                  .format("YYYY/MM/DD HH:mm:ss")}
              </p>
            </button>
          ))}
        {entries
          .filter((entry) => entry.type !== "folder")
          .map((entry) => (
            <div
              className="flex flex-row text-[#999999] border-b px-4 py-1.5"
              key={entry.key}
            >
              <p className="truncate flex-1 lg:flex-[2]">
                {extractName(entry.key)}
              </p>
              <p className="truncate flex-1">{entry.type}</p>
              <p className="lg:flex-1 hidden lg:block">
                {dayjs(entry.updatedAt)
                  .tz("Asia/Tokyo")
                  .format("YYYY/MM/DD HH:mm:ss")}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
