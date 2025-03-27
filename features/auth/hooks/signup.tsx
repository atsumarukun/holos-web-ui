"use client";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { signup } from "../actions/signup";
import { Account } from "../schemas/account";
import { Signup } from "../schemas/signup";

type Props = Readonly<{
  onCompleted?: (data?: Account) => void;
  onError?: (err?: Error) => void;
}>;

export const useSignup = (props?: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Account | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const onSubmit: SubmitHandler<Signup> = async (data) => {
    setLoading(true);
    try {
      const account = await signup(data);
      setData(account);
      props?.onCompleted?.(account);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        props?.onError?.(e);
      } else {
        const err = new Error("failed to sign up");
        setError(err);
        props?.onError?.(err);
      }
    }
    setLoading(false);
  };

  return {
    loading,
    data,
    error,
    onSubmit,
  };
};
