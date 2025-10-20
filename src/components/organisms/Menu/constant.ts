import { IconType } from "react-icons";
import { LuBot, LuHouse } from "react-icons/lu";

export type Floor = {
  key: string;
  name: string;
  icon: IconType;
} & (
  | {
      children: {
        path: string;
        name: string;
      }[];
    }
  | {
      path: string;
    }
);

export const floors: Floor[] = [
  {
    key: "home",
    name: "ホーム",
    icon: LuHouse,
    path: "/",
  },
];
