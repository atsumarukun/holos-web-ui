import { Logo } from "@/components/atoms/Logo";
import { SigninForm } from "../../organisms/SigninForm";

export const SigninTemplate = () => {
  return (
    <div className="flex flex-col items-center gap-24 md:gap-12">
      <div className="flex flex-col items-center">
        <Logo noIcon />
        <h1 className="text-lg">ログイン</h1>
      </div>
      <SigninForm />
    </div>
  );
};
