import * as React from "react";
import { Metadata } from "next";
import { inter } from "./_lib/utils";
import { MongoDbInit } from "./_lib/services/mongoose";
import "@/app/globals.css";

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
      <body className={`${inter.className} bg-background`}>{children}</body>
    </html>
  );
};

export default RootLayout;
