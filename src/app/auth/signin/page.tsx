import { SigninTemplate } from "@/features/auth/components/templates/SigninTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン - Holos",
  description:
    "Holosへのログインページ。アカウントにログインしてサービスの管理が行えます。",
};

export default function SigninPage() {
  return <SigninTemplate />;
}
