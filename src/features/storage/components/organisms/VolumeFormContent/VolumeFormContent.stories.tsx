import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeFormContent } from "./VolumeFormContent";
import { VolumeInput } from "./schema";
import { useForm } from "react-hook-form";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Storage/Organisms/VolumeFormContent",
  component: VolumeFormContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    control: undefined,
    errors: undefined,
    register: fn(),
  },
} satisfies Meta<typeof VolumeFormContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const {
      control,
      register,
      formState: { errors },
    } = useForm<VolumeInput>();
    return (
      <VolumeFormContent
        control={control}
        errors={errors}
        register={register}
      />
    );
  },
};
