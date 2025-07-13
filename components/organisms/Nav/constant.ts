import { LuUser } from "react-icons/lu";
import { MdOutlineStorage } from "react-icons/md";
import { Floor } from ".";

export const floors: Floor[] = [
  {
    key: "account",
    name: "アカウント",
    ruby: "あかうんと",
    icon: LuUser,
    children: [
      {
        name: "エージェント",
        ruby: "えーじぇんと",
        href: "/test",
      },
      {
        name: "トークン",
        ruby: "とーくん",
        href: "/test",
      },
    ],
  },
  {
    key: "storage",
    name: "ストレージ",
    ruby: "すとれーじ",
    icon: MdOutlineStorage,
    href: "/",
  },
];
