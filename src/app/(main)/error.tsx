"use client";

import { Error } from "@/components/molecules/Error";

export default function ErrorPage() {
  return (
    <Error
      variant="page"
      title="サーバー内部でエラーが発生しました"
      description="アクセスしようとしたページは表示できませんでした. 時間をおいて再度お試しください."
    />
  );
}
