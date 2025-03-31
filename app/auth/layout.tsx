export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full md:w-[450px] md:shadow-default rounded-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-12">
      {children}
    </main>
  );
}
