import { Logo } from "@/components/atoms/Logo";
import { SigninForm } from "../organisms/SigninForm";

export const SigninView = () => {
  return (
    <div className="grow flex flex-col items-center gap-4 md:gap-8">
      <Logo />
      <div className="w-full grow flex flex-col items-center gap-24 md:gap-6">
        <h1 className="text-lg">ログイン</h1>
        <SigninForm />
      </div>
    </div>
  );
};
