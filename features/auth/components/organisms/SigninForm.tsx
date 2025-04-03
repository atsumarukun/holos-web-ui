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
import { useSignin } from "../../hooks/signin";
import { Signin, signinSchema } from "../../schemas/signin";

export const SigninForm = () => {
  const router = useRouter();
  const [error, setError] = useState<ActionsError | undefined>();

  var test = "test";
  console.log(test);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signin>({ resolver: zodResolver(signinSchema) });

  const { onSubmit } = useSignin({
    onCompleted: () => {
      successToast("ログインしました.");
      router.push("/");
    },
    onError: (err) => {
      if (err?.code === actionsErrorCode.Unauthorized) {
        setError(err);
      } else {
        errorToast();
      }
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        {error && (
          <p className="text-xs text-alert text-center">
            アカウントが存在しないかパスワードが異なります.
          </p>
        )}
        <InputField error={errors.accountName?.message}>
          <IconLabel htmlFor="name" icon={LuUserRound} />
          <Input
            id="name"
            placeholder="アカウント名"
            {...register("accountName")}
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
      </FormField>
      <div className="grow flex justify-between items-center mt-6 md:mt-0">
        <Link
          href="/auth/signup"
          className="text-sm rounded-full hover:bg-hover px-4 py-1.5 -ml-4"
        >
          アカウント作成
        </Link>
        <SubmitButton>ログイン</SubmitButton>
      </div>
    </Form>
  );
};
