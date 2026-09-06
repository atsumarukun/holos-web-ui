import { Error } from "@/components/molecules/Error";
import { GetEntriesResponse } from "@/features/storage/actions/get-entries";
import { extractName } from "@/features/storage/lib/key";
import { cn } from "@/lib/utils";
import { LuEyeOff } from "react-icons/lu";

type Props = Readonly<{
  volumeName: string;
  entry: GetEntriesResponse["entries"][number];
  className?: string;
}>;

export const PreviewEntry = ({ volumeName, entry, className }: Props) => {
  const src = `/api/storage/entries/${volumeName}/${entry.key}`;

  if (entry.type.startsWith("image/")) {
    return <img src={src} alt={extractName(entry.key)} className={className} />;
  } else if (entry.type.startsWith("video/")) {
    return <video src={src} className={className} controls autoPlay />;
  } else if (entry.type.startsWith("audio/")) {
    return (
      <audio src={src} controls autoPlay className={cn("w-128", className)} />
    );
  } else if (
    entry.type.startsWith("text/") ||
    entry.type === "application/pdf"
  ) {
    return (
      <iframe src={src} width={1920} height={1080} className={className} />
    );
  }

  return (
    <div className="bg-background rounded-lg p-12">
      <Error
        icon={LuEyeOff}
        variant="dialog"
        title="プレビューに失敗しました"
        description="このエントリーはプレビューできません."
      />
    </div>
  );
};
