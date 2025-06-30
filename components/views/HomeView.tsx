import { Heading } from "../atoms/Heading";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { Board } from "../templates/Board";

export const HomeView = () => {
  return (
    <div className="h-full grow flex flex-col gap-8 px-12 py-8">
      <Heading>HomePage</Heading>
      <Board className="grow">
        <div className="h-full flex justify-center items-center">
          <ThemeToggle />
        </div>
      </Board>
    </div>
  );
};
