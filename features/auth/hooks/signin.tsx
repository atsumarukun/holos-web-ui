"use client";

import { ActionsError, isActionsError } from "@/lib/actions-error";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { signin } from "../actions/signin";
import { Session } from "../schemas/session";
import { Signin } from "../schemas/signin";

type Props = Readonly<{
  onCompleted?: (data?: Session) => void;
  onError?: (err?: ActionsError) => void;
}>;

export const useSignin = (props?: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Session | undefined>(undefined);
  const [error, setError] = useState<ActionsError | undefined>(undefined);

  const onSubmit: SubmitHandler<Signin> = async (data) => {
    setLoading(true);
    const res = await signin(data);
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
