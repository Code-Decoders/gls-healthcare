import * as React from "react";
import { Metadata } from "next";
import { DashboardNavbar, Header } from "@/app/components";
import { UserType } from "@/app/lib/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full h-full">
      <DashboardNavbar type={UserType.DOCTOR} />
      <div className="pl-[70px] h-full w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
