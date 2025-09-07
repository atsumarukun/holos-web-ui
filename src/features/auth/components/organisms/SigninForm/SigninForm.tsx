"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SigninInput, signinFormSchema } from "./schema";
import { LuLockKeyhole, LuUserRound } from "react-icons/lu";
import { InputField } from "../../molecules/InputField";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { signin } from "@/features/auth/actions/signin";
import { errorToast, successToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/atoms/Alert";

export const SigninForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinFormSchema),
  });

  const onSubmit: SubmitHandler<SigninInput> = async (data) => {
    const res = await signin(data);
    if (res.success) {
      successToast("ログインしました.");
      router.push("/");
    } else {
      if (res.error) {
        setError(res.error);
      } else {
        errorToast();
      }
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && <Alert text={error} className="text-xs" />}
      <div className="flex flex-col gap-3">
        <InputField
          id="name"
          placeholder="アカウント名"
          icon={LuUserRound}
          error={errors.accountName?.message}
          registerReturn={register("accountName")}
        />
        <InputField
          id="password"
          placeholder="パスワード"
          type="password"
          icon={LuLockKeyhole}
          error={errors.password?.message}
          registerReturn={register("password")}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Link
          href="/auth/signup"
          className="text-xs rounded-full hover:bg-accent hover:text-accent-foreground py-2 px-3 -ml-3"
        >
          アカウント作成
        </Link>
        <Button label="ログイン" />
      </div>
    </form>
  );
};
