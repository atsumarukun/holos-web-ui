export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-screen flex items-center justify-center md:bg-[#f4f6f8]">
      <div className="w-full md:w-[450px] bg-background rounded-lg md:shadow-xl p-12">
        {children}
      </div>
    </main>
  );
}
