import { WorkspaceLayout } from "@/components/layouts/WorkspaceLayout";
import { Error } from "@/components/molecules/Error";

export default async function NotFoundPage() {
  return (
    <WorkspaceLayout>
      <Error
        variant="page"
        title="ページが存在しません"
        description="お探しのページは移動または削除された可能性があります."
      />
    </WorkspaceLayout>
  );
}
