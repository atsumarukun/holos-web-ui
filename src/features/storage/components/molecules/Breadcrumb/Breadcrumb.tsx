import { MdChevronRight } from "react-icons/md";

type Props = Readonly<{
  volumeName: string;
  entryKey: string;
  onClickPart: (key: string) => void;
}>;

export const Breadcrumb = ({ volumeName, entryKey, onClickPart }: Props) => {
  const parts = entryKey === "" ? [] : entryKey.split("/");

  return (
    <div className="flex flex-row text-sm text-[#999999]">
      {parts.length > 0 ? (
        <>
          <button
            onClick={() => onClickPart("")}
            className="hover:text-foreground"
          >
            {volumeName}
          </button>
          <MdChevronRight size={18} className="mt-0.5" />
        </>
      ) : (
        <p className="text-foreground">{volumeName}</p>
      )}
      {parts.slice(0, parts.length - 1).map((part, i) => (
        <div className="flex flex-row" key={i}>
          <button
            onClick={() => onClickPart(parts.slice(0, i + 1).join("/"))}
            className="hover:text-foreground"
            key={i}
          >
            {part}
          </button>
          <MdChevronRight size={18} className="mt-0.5" />
        </div>
      ))}
      <p className="text-foreground">{parts.at(-1) ?? ""}</p>
    </div>
  );
};
