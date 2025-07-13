"use client";

import { Accordion } from "@/components/ui/accordion";
import { buildClassName } from "@/lib/class-name";
import { useState } from "react";
import { NavItem } from "./NavItem";
import { SearchNavField } from "./SearchNavField";
import { floors } from "./constant";

type Props = {
  className?: string;
  onAccess?: () => void;
};

export const Nav = ({ className, onAccess }: Props) => {
  const [searchKey, setSearchKey] = useState("");

  const collator = new Intl.Collator("ja", {
    usage: "search",
    sensitivity: "base",
  });
  const compareSearchKey = (str: string) => {
    return !collator.compare(str.slice(0, searchKey.length), searchKey);
  };
  const searchedFloors = floors.filter(
    (floor) =>
      compareSearchKey(floor.name) ||
      compareSearchKey(floor.ruby) ||
      ("children" in floor &&
        floor.children.filter(
          (child) =>
            compareSearchKey(child.name) || compareSearchKey(child.ruby)
        ).length)
  );

  return (
    <nav className={buildClassName("grow flex flex-col gap-6", className)}>
      <SearchNavField onSearch={(key) => setSearchKey(key)} />
      <Accordion type="single" collapsible className="text-sm w-full grow">
        {searchedFloors.map((floor) => (
          <NavItem floor={floor} key={floor.key} onAccess={onAccess} />
        ))}
      </Accordion>
    </nav>
  );
};
