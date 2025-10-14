import { Logo } from "@/components/atoms/Logo";
import { SignupForm } from "../../organisms/SignupForm";

export const SignupTemplate = () => {
  return (
    <div className="flex flex-col items-center gap-24 md:gap-12">
      <div className="flex flex-col items-center">
        <Logo noIcon />
        <h1 className="text-lg">アカウント作成</h1>
      </div>
      <SignupForm />
    </div>
  );
};
