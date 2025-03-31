"use client";

import { IconLabel } from "@/components/atoms/IconLabel";
import { Input } from "@/components/atoms/Input";
import {
  Form,
  FormField,
  InputField,
  SubmitButton,
} from "@/components/templates/Form";
import { ActionsError, actionsErrorCode } from "@/lib/actions-error";
import { errorToast, successToast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuLockKeyhole, LuUserRound } from "react-icons/lu";
import { useSignup } from "../../hooks/signup";
import { Signup, signupSchema } from "../../schemas/signup";

export const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<ActionsError | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({ resolver: zodResolver(signupSchema) });

  const { onSubmit } = useSignup({
    onCompleted: () => {
      successToast("アカウントを作成しました.");
      router.push("/auth/signin");
    },
    onError: (err) => {
      if (err?.code === actionsErrorCode.Conflict) {
        setError(err);
      } else {
        errorToast();
      }
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <InputField
          error={
            error
              ? "アカウント名がすでに利用されています."
              : errors.name?.message
          }
        >
          <IconLabel htmlFor="name" icon={LuUserRound} />
          <Input
            id="name"
            placeholder="アカウント名"
            {...register("name", { onChange: () => setError(undefined) })}
          />
        </InputField>
        <InputField error={errors.password?.message}>
          <IconLabel htmlFor="password" icon={LuLockKeyhole} />
          <Input
            id="password"
            placeholder="パスワード"
            type="password"
            {...register("password")}
          />
        </InputField>
        <InputField error={errors.confirmPassword?.message}>
          <IconLabel htmlFor="confirmPassword" icon={LuLockKeyhole} />
          <Input
            id="confirmPassword"
            placeholder="パスワード(確認)"
            type="password"
            {...register("confirmPassword")}
          />
        </InputField>
      </FormField>
      <div className="grow flex justify-between items-center mt-6 md:mt-0">
        <Link
          href="/auth/signin"
          className="text-sm rounded-full hover:bg-hover px-4 py-1.5 -ml-4"
        >
          ログイン
        </Link>
        <SubmitButton>作成</SubmitButton>
      </div>
    </Form>
  );
};
