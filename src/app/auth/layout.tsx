export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-[100dvh] w-screen flex items-center justify-center md:bg-secondary">
      <div className="w-full md:w-[450px] bg-background rounded-lg md:shadow-xl p-12">
        {children}
      </div>
    </main>
  );
}
