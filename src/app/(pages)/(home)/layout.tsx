import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Navbar from "@/app/_components/navbar";
import "@/app//globals.css";

export const metadata: Metadata = {
  title: "GLS Healthcare",
  description: "Ledger based healthcare system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div
        className="mt-[70px] w-screen "
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
