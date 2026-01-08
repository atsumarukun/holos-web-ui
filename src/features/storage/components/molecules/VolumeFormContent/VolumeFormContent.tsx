import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { VolumeInput } from "./schema";
import { InputField } from "@/components/molecules/InputField";
import { Switch } from "@/components/ui/Switch";

type Props = Readonly<{
  control: Control<VolumeInput>;
  errors: FieldErrors<VolumeInput>;
  register: UseFormRegister<VolumeInput>;
}>;

export const VolumeFormContent = ({ control, errors, register }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <InputField
        id="name"
        label="ボリューム名"
        registerReturn={register("name")}
        error={errors.name?.message}
        isRequired
      />
      <div className="flex flex-row items-center gap-2">
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <label htmlFor="isPublic">パブリック公開</label>
      </div>
    </div>
  );
};
