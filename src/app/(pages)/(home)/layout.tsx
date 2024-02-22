import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Navbar from "@/app/components/navbar";
import "@/app//globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <div className={`h-full w-full`}>
      <Navbar />
      <div className="mt-[70px] w-full h-full">
        <Providers>{children}</Providers>
      </div>
    </div>
  );
}
