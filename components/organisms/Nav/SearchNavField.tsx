import { IconLabel } from "@/components/atoms/IconLabel";
import { LuSearch } from "react-icons/lu";

type Props = {
  onSearch: (key: string) => void;
};

export const SearchNavField = ({ onSearch }: Props) => {
  return (
    <div className="flex flex-row items-center border-b border-separator gap-2 px-1 pb-1 mx-6">
      <IconLabel htmlFor="nav-search" icon={LuSearch} />
      <input
        className="grow bg-inherit focus:outline-none placeholder:text-placeholder"
        id="nav-search"
        placeholder="search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
