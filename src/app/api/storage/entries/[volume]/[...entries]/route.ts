import { getToken } from "@/actions/token";

export const GET = async (
  _: Request,
  ctx: RouteContext<"/api/storage/entries/[volume]/[...entries]">,
) => {
  const { volume, entries } = await ctx.params;
  const token = await getToken();
  return fetch(
    `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volume}/${entries.join("/")}`,
    {
      method: "GET",
      headers: {
        Authorization: `Session ${token}`,
      },
      cache: "no-cache",
    },
  );
};
