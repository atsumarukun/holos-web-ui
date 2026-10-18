import { VolumeList } from "../../organisms/VolumeList";
import { Breadcrumbs } from "@/components/molecules/Breadcrumb";
import { Template } from "@/components/ui/Template";
import { Heading } from "@/components/atoms/Heading";
import { VolumeToolbar } from "../../organisms/VolumeToolbar";
import { RefetchProvider } from "@/providers/refetch";

const breadcrumbs: Breadcrumbs = [
  { label: "ストレージ", href: "/storage" },
  { label: "ボリューム一覧", href: "/storage/volumes" },
];

export const VolumeListTemplate = () => {
  return (
    <Template breadcrumbs={breadcrumbs}>
      <RefetchProvider>
        <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-0 mb-4 md:mb-6">
          <Heading text="ボリューム一覧" />
          <VolumeToolbar />
        </div>
        <VolumeList />
      </RefetchProvider>
    </Template>
  );
};
