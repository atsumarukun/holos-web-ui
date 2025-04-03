import { MdErrorOutline, MdOutlineCheckCircle } from "react-icons/md";
import { toast } from "sonner";

export const successToast = (title: string, description?: string) => {
  return toast(title, {
    description: description,
    icon: MdOutlineCheckCircle({
      color: "var(--safe)",
      size: 20,
    }),
    style: {
      color: "var(--foreground)",
      backgroundColor: "var(--background)",
      border: "none",
      borderLeft: "var(--safe) 8px solid",
      boxShadow: "0 0 50px var(--board)",
    },
  });
};

export const errorToast = () => {
  return toast("エラーが発生しました", {
    icon: MdErrorOutline({
      color: "var(--alert)",
      size: 20,
    }),
    style: {
      color: "var(--foreground)",
      backgroundColor: "var(--background)",
      border: "none",
      borderLeft: "var(--alert) 8px solid",
      boxShadow: "0 0 50px var(--board)",
    },
  });
};
