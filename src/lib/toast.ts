import { TbCircleCheckFilled } from "react-icons/tb";
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
