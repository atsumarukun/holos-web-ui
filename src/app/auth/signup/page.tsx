import { SignupTemplate } from "@/features/auth/components/templates/SignupTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント作成 - Holos",
  description:
    "Holosのアカウント作成ページ。アカウントを作成してサービスの管理が行えます。",
};

export default function SignupPage() {
  return <SignupTemplate />;
}
