"use client"
import * as React from "react";
import { Metadata } from "next";
import { DashboardNavbar, Header } from "@/app/_components";
import { useAppProvider } from "@/app/providers";
import Loading from "@/app/_components/dashboards/loading";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const { state } = useAppProvider();

  return !state?.user ? (
    <Loading />
  ): 
  (
    <div className="w-full h-full">
      <DashboardNavbar />
      <div className="pl-[70px] h-full w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

