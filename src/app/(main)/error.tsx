"use client";

import { Error } from "@/components/molecules/Error";

export default function ErrorPage() {
  return (
    <Error
      variant="page"
      title="エラーが発生しました"
      description="アクセスしようとしたページは表示できませんでした.\n時間をおいて再度お試しください."
    />
  );
}
