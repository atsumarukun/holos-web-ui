type Props = Readonly<{
  textSize?: string;
}>;

export const Logo = ({ textSize }: Props) => {
  return (
    <p className={`font-playwrite ${textSize ?? "text-3xl"}`}>
      H<span className="text-theme">o</span>los
    </p>
  );
};
