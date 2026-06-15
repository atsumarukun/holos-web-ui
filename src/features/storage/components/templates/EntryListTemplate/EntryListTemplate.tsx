"use client";

import { Breadcrumbs } from "@/components/molecules/Breadcrumb";
import { EntryList } from "../../organisms/EntryList";
import { Template } from "@/components/ui/Template";
import { RefetchProvider } from "@/providers/refetch";
import { Heading } from "@/components/atoms/Heading";
import { EntryToolbar } from "../../organisms/EntryToolbar";

type Props = Readonly<{
  volumeName: string;
  currentKey: string;
}>;

export const EntryListTemplate = ({ volumeName, currentKey }: Props) => {
  const keyParts = currentKey.split("/").filter((v) => v !== "");
  const breadcrumbs: Breadcrumbs = [
    { label: "ストレージ", href: "/storage" },
    { label: "エントリー一覧", href: `/storage/entries/${volumeName}` },
    { label: volumeName, href: `/storage/entries/${volumeName}` },
    ...keyParts.map((keyPart, i) => ({
      label: keyPart,
      href: `/storage/entries/${volumeName}/${keyParts.slice(0, i + 1).join("/")}`,
    })),
  ];

  return (
    <Template breadcrumbs={breadcrumbs}>
      <RefetchProvider>
        <div className="flex flex-col gap-6 mb-6">
          <Heading text="エントリー一覧" />
          <EntryToolbar volumeName={volumeName} currentKey={currentKey} />
        </div>
        <EntryList volumeName={volumeName} currentKey={currentKey} />
      </RefetchProvider>
    </Template>
  );
};
