"use client";

import { LuLockKeyhole, LuUserRound } from "react-icons/lu";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { InputField } from "../../molecules/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupInput, signupFormSchema } from "./schema";
import { useState } from "react";
import { signup } from "@/features/auth/actions/signup";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toast";

export const SignupForm = () => {
  const router = useRouter();

  const [nameError, setNameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupInput> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError("パスワードが一致しません.");
      return;
    }

    const res = await signup(data);
    if (res.success) {
      successToast("アカウントを作成しました.");
      router.push("/auth/signin");
    } else {
      if (res.error) {
        setNameError(res.error);
      } else {
        errorToast();
      }
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-12 md:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3">
        <InputField
          id="name"
          placeholder="アカウント名"
          icon={LuUserRound}
          error={nameError ?? errors.name?.message}
          registerReturn={register("name", {
            onChange: () => setNameError(undefined),
          })}
        />
        <InputField
          id="password"
          placeholder="パスワード"
          type="password"
          icon={LuLockKeyhole}
          error={passwordError ?? errors.password?.message}
          registerReturn={register("password", {
            onChange: () => setPasswordError(undefined),
          })}
        />
        <InputField
          id="confirmPassword"
          placeholder="パスワード(確認)"
          type="password"
          icon={LuLockKeyhole}
          error={passwordError ?? errors.confirmPassword?.message}
          registerReturn={register("confirmPassword", {
            onChange: () => setPasswordError(undefined),
          })}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Link
          href="/auth/signin"
          className="text-xs rounded-full hover:bg-accent hover:text-accent-foreground py-2 px-3 -ml-3"
        >
          ログイン
        </Link>
        <Button label="作成" />
      </div>
    </form>
  );
};
