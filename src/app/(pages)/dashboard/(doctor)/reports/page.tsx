import * as React from "react";
import { Report } from "@/app/_lib/types";
import { playfairDisplay } from "@/app/_lib/utils";
import { ReportTile } from "@/app/_components";

const Reports: React.FC = () => {

    
  return (
    <div
      className="w-full flex flex-col justify-start"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <span
        className={`md:text-5xl text-3xl font-bold ${playfairDisplay.className} mt-16 mb-16`}
      >
        Reports
      </span>
    </div>
  );
};

export default Reports;
