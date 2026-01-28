import { Button } from "@/components/atoms/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";

type Props = Readonly<{
  title: string;
  description: string;
  approveLabel: string;
  open: boolean;
  onOpenChange: () => void;
  onApprove: () => void;
}>;

export const ConfirmDialog = ({
  title,
  description,
  approveLabel,
  open,
  onOpenChange,
  onApprove,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            label="キャンセル"
            type="button"
            onClick={onOpenChange}
          />
          <Button label={approveLabel} onClick={onApprove} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
