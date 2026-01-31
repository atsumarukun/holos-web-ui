import { TbAlertCircleFilled, TbCircleCheckFilled } from "react-icons/tb";
import { toast } from "sonner";

export const successToast = (title: string, description?: string) => {
  return toast(title, {
    description: description,
    icon: TbCircleCheckFilled({
      color: "var(--constructive)",
      size: 24,
    }),
    style: {
      color: "var(--foreground)",
      backgroundColor: "var(--background)",
      border: "none",
      borderLeft: "var(--constructive) 4px solid",
      borderRadius: 4,
      gap: 12,
    },
  });
};

export const errorToast = (description?: string) => {
  return toast("エラーが発生しました", {
    description: description,
    icon: TbAlertCircleFilled({
      color: "var(--destructive)",
      size: 24,
    }),
    style: {
      color: "var(--foreground)",
      backgroundColor: "var(--background)",
      border: "none",
      borderLeft: "var(--destructive) 4px solid",
      borderRadius: 4,
      gap: 12,
    },
  });
};
