"use client";

import { getToken } from "@/actions/token";
import { useEffect, useState } from "react";

export const useToken = (): string | undefined => {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setToken(await getToken());
    })();
  }, []);

  return token;
};
