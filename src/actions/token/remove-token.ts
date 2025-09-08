"use server";

import { cookies } from "next/headers";

export const removeToken = async () => {
  const store = await cookies();
  store.delete("token");
};
