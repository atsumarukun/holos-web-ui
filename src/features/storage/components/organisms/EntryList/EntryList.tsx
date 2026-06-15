"use client";

import { IconButton } from "@/components/atoms/IconButton";
import { Error } from "@/components/molecules/Error";
import { useEntryList } from "@/features/storage/hooks/entry-list";
import { useEntrySelection } from "@/features/storage/hooks/select-entry";
import { useScrollbarWidthVariable } from "@/hooks/scrollbar-width";
import { errorCode } from "@/lib/errors";
import { refetchContext } from "@/providers/refetch";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
} from "react-icons/md";
import { SelectedEntriesDropdownMenu } from "../SelectedEntriesDropdownMenu";
import Link from "next/link";
import dayjs from "@/lib/dayjs";
import { EntryDropdownMenu } from "../EntryDropdownMenu";
import { formatSize } from "@/features/storage/lib/size";
import { extractName } from "@/features/storage/lib/key";
import { LuFile, LuFolder } from "react-icons/lu";

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
}>;

export const EntryList = ({ volumeName, currentKey }: Props) => {
  const router = useRouter();
  const context = useContext(refetchContext);

  const { loading, entries, error, refetch } = useEntryList({
    volumeName: volumeName,
    currentKey: currentKey,
  });
  const { isSelectedAll, selectedEntryKeys, onSelectAll, onSelect, onClear } =
    useEntrySelection({
      entries: entries,
    });

  const { scrollbarRef } = useScrollbarWidthVariable({
    variableName: "--scrollbar-width",
  });

  useEffect(() => {
    context.setRefetch(() =>
      refetch({
        onCompleted: () => {
          onClear();
        },
      }),
    );
  }, [context, refetch, onClear]);

  useEffect(() => {
    if (
      error?.code === errorCode.Unauthenticated ||
      error?.code === errorCode.Unauthorized
    ) {
      router.push("/auth/signin");
    }
  }, [error, router]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return (
      <Error
        icon={FiAlertTriangle}
        variant="page"
        title="エントリーの取得に失敗しました"
        description="再度ページを読み込み直してください."
      />
    );
  }

  if (!entries || !entries.length) {
    return (
      <Error
        variant="page"
        title="エントリーが存在しません"
        description="作成ボタンをから作成してください."
      />
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-[2px]">
      <div className="flex flex-row items-center gap-2 bg-white px-6">
        <IconButton
          icon={
            isSelectedAll ? MdIndeterminateCheckBox : MdCheckBoxOutlineBlank
          }
          variant="ghost"
          className={
            isSelectedAll
              ? "text-accent-foreground hover:text-accent-foreground/75"
              : "text-[#999999]"
          }
          onClick={onSelectAll}
        />
        <div className="grow flex flex-row py-4">
          <p className="basis-5/9 pr-2">エントリー名</p>
          <p className="basis-1/9 pr-2">タイプ</p>
          <p className="basis-1/9 pr-2">サイズ</p>
          <p className="grow pr-2">最終更新日時</p>
        </div>
        <SelectedEntriesDropdownMenu
          volumeName={volumeName}
          currentKey={currentKey}
          entryKeys={selectedEntryKeys}
        />
      </div>
      <div
        ref={scrollbarRef}
        className="flex-1 min-h-0 flex flex-col gap-[2px] overflow-y-auto -mr-[var(--scrollbar-width)]"
      >
        {entries.map((entry) => (
          <div
            className="flex flex-row items-center gap-2 bg-white px-6"
            key={entry.key}
          >
            <IconButton
              icon={
                selectedEntryKeys.includes(entry.key)
                  ? MdCheckBox
                  : MdCheckBoxOutlineBlank
              }
              variant="ghost"
              className={
                selectedEntryKeys.includes(entry.key)
                  ? "text-accent-foreground hover:text-accent-foreground/75"
                  : "text-[#999999]"
              }
              onClick={() => onSelect(entry.key)}
            />
            <Link
              href={`/storage/entries/${volumeName}/${entry.key}`}
              className="grow flex flex-row py-4"
            >
              <p className="basis-5/9 pr-2">{extractName(entry.key)}</p>
              <p className="min-w-0 flex flex-row items-center gap-2 basis-1/9 text-[#999999] pr-2">
                <span>
                  {entry.type === "folder" ? <LuFolder /> : <LuFile />}
                </span>
                <span className="truncate">{entry.type}</span>
              </p>
              <p className="basis-1/9 text-[#999999] pr-2">
                {entry.type === "folder" ? "-----" : formatSize(entry.size)}
              </p>
              <p className="grow text-[#999999] pr-2">
                {dayjs(entry.updatedAt)
                  .tz("Asia/Tokyo")
                  .format("YYYY/MM/DD HH:mm:ss")}
              </p>
            </Link>
            <EntryDropdownMenu
              volumeName={volumeName}
              currentKey={currentKey}
              entry={entry}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
