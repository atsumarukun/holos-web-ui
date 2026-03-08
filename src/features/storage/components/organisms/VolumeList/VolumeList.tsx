"use client";

import { IconButton } from "@/components/atoms/IconButton";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
} from "react-icons/md";
import dayjs from "@/lib/dayjs";
import { VolumeDropdownMenu } from "../VolumeDropdownMenu";
import Link from "next/link";
import { SelectedVolumesDropdownMenu } from "../SelectedVolumesDropdownMenu";
import { useVolumeSelection } from "@/features/storage/hooks/select-volume";
import { useScrollbarWidthVariable } from "@/hooks/scrollbar-width";
import { useContext, useEffect } from "react";
import { refetchContext } from "@/providers/refetch";
import { useVolumeList } from "@/features/storage/hooks/volume-list";
import { Error } from "@/components/molecules/Error";
import { FiAlertTriangle } from "react-icons/fi";

export const VolumeList = () => {
  const context = useContext(refetchContext);

  const { loading, success, volumes, refetch } = useVolumeList();
  const { isSelectedAll, selectedVolumes, onSelectAll, onSelect } =
    useVolumeSelection({
      volumes: volumes,
    });

  const { scrollbarRef } = useScrollbarWidthVariable({
    variableName: "--scrollbar-width",
  });

  useEffect(() => {
    context.setRefetch(refetch);
  }, [context, refetch]);

  if (loading) {
    return <></>;
  }

  if (!success) {
    return (
      <Error
        icon={FiAlertTriangle}
        title="ボリュームの取得に失敗しました"
        description="再度ページを読み込み直してください."
      />
    );
  }
  if (!volumes || !volumes.length) {
    return (
      <Error
        title="ボリュームが存在しません"
        description="作成ボタンをから作成してください."
      />
    );
  }

  return (
    <>
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
            <p className="basis-3/5 pr-2">ボリューム名</p>
            <p className="basis-[12%] pr-2">公開状況</p>
            <p className="grow pr-2">最終更新日時</p>
          </div>
          <SelectedVolumesDropdownMenu volumes={selectedVolumes} />
        </div>
        <div
          ref={scrollbarRef}
          className="flex-1 min-h-0 flex flex-col gap-[2px] overflow-y-auto -mr-[var(--scrollbar-width)]"
        >
          {volumes.map((volume) => (
            <div
              className="flex flex-row items-center gap-2 bg-white px-6"
              key={volume.name}
            >
              <IconButton
                icon={
                  selectedVolumes.includes(volume.name)
                    ? MdCheckBox
                    : MdCheckBoxOutlineBlank
                }
                variant="ghost"
                className={
                  selectedVolumes.includes(volume.name)
                    ? "text-accent-foreground hover:text-accent-foreground/75"
                    : "text-[#999999]"
                }
                onClick={() => onSelect(volume.name)}
              />
              <Link
                href={`/storage/entities/${volume.name}`}
                className="grow flex flex-row py-4"
              >
                <p className="basis-3/5 pr-2">{volume.name}</p>
                <p className="basis-[12%] text-[#999999] pr-2">
                  {volume.isPublic ? "PUBLIC" : "PRIVATE"}
                </p>
                <p className="grow text-[#999999] pr-2">
                  {dayjs(volume.updatedAt)
                    .tz("Asia/Tokyo")
                    .format("YYYY/MM/DD HH:mm:ss")}
                </p>
              </Link>
              <VolumeDropdownMenu volume={volume} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
