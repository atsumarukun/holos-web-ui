import { IconType } from "react-icons";

export { Nav } from "./Nav";

export type Floor = {
  key: string;
  name: string;
  ruby: string;
  icon: IconType;
} & (
  | {
      children: {
        name: string;
        ruby: string;
        href: string;
      }[];
    }
  | {
      href: string;
    }
);
