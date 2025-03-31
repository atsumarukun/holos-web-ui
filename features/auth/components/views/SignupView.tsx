import { Logo } from "@/components/atoms/Logo";
import { SignupForm } from "../organisms/SignupForm";

export const SignupView = () => {
  return (
    <div className="grow flex flex-col items-center gap-4 md:gap-8">
      <Logo />
      <div className="w-full grow flex flex-col items-center gap-24 md:gap-6">
        <h1 className="text-lg">ユーザー作成</h1>
        <SignupForm />
      </div>
    </div>
  );
};
