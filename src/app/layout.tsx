import * as React from "react";
import { Metadata } from "next";
import { inter } from "./_lib/utils";
import "@/app/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "GLS Healthcare",
  description: "Ledger based healthcare system",
  keywords: [
    "GLS",
    "Healthcare",
    "Ledger",
    "Blockchain",
    "Hyperledger",
    "Fabric",
  ],
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
