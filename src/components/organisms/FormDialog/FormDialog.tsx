import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FormEventHandler, ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  title: string;
  submitLabel: string;
  open: boolean;
  onOpenChange: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>;

export const FormDialog = ({
  children,
  title,
  submitLabel,
  open,
  onOpenChange,
  onSubmit,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[450px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <VisuallyHidden>
              <DialogDescription />
            </VisuallyHidden>
          </DialogHeader>
          <div className="py-4">{children}</div>
          <DialogFooter>
            <Button
              variant="outline"
              label="キャンセル"
              onClick={onOpenChange}
            />
            <Button label={submitLabel} type="submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
