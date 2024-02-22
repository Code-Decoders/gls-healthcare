import * as React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="h-full w-full">{children}</div>;
};

export default AuthLayout;
