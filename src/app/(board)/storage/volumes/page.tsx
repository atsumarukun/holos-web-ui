import { VolumeListTemplate } from "@/features/storage/components/templates/VolumeListTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ボリューム一覧 - Holos",
  description:
    "ボリューム一覧ページ。ボリュームを作成してファイルの管理が行えます。",
};

export default function VolumeListPage() {
  return <VolumeListTemplate />;
}
