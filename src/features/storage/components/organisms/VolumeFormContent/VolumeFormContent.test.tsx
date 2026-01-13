import { render, renderHook, screen } from "@testing-library/react";
import { VolumeFormContent } from "./VolumeFormContent";
import { useForm } from "react-hook-form";
import { VolumeInput } from "./schema";

describe("Storage/Organisms/VolumeFormContent", () => {
  it("renders", () => {
    const { result } = renderHook(() => useForm<VolumeInput>());
    render(
      <VolumeFormContent
        control={result.current.control}
        register={result.current.register}
        errors={result.current.formState.errors}
      />
    );
    expect(screen.getByText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("パブリック公開")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getAllByText("必須")).toHaveLength(1);
  });
});
