"use client";

import { ActionsError, isActionsError } from "@/lib/actions-error";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { signup } from "../actions/signup";
import { Account } from "../schemas/account";
import { Signup } from "../schemas/signup";

type Props = Readonly<{
  onCompleted?: (data?: Account) => void;
  onError?: (err?: ActionsError) => void;
}>;

export const useSignup = (props?: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Account | undefined>(undefined);
  const [error, setError] = useState<ActionsError | undefined>(undefined);

  const onSubmit: SubmitHandler<Signup> = async (data) => {
    setLoading(true);
    const res = await signup(data);
    if (isActionsError(res)) {
      setError(res);
      props?.onError?.(res);
    } else {
      setData(res);
      props?.onCompleted?.(res);
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
