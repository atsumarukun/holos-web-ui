"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { SearchInput, searchFormSchema } from "./schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchBox = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchFormSchema),
  });

  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    const params = new URLSearchParams(searchParams.toString());
    if (data.keyword) {
      params.set("search", data.keyword);
    } else {
      params.delete("search");
    }
    router.push(path + "?" + params.toString());
  };

  return (
    <form
      className="max-w-lg w-full flex flex-row items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="検索"
        className="grow bg-background border rounded-l focus:outline-none px-4 py-1.5"
        {...register("keyword")}
      />
      <button className="text-white bg-[#999999] hover:bg-primary/90 border border-l-0 rounded-r px-4 py-2">
        <LuSearch size={20} />
      </button>
    </form>
  );
};
