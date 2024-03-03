import * as React from "react";
import { Report } from "@/app/_lib/types";
import { Card } from "@nextui-org/react";
import Link from "next/link";

const ReportTile: React.FC<Partial<Report>> = ({
  doctorId,
  patientId,
  reportTitle,
  reportUrl,
}) => {
  return (
    <Card className="w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold">{reportTitle}</h3>
        <p className="text-sm text-gray-600">Doctor: {doctorId}</p>
        <p className="text-sm text-gray-600">Patient: {patientId}</p>
        <Link href={reportUrl || ""} target="_">
          <a className="text-blue-500">View Report</a>
        </Link>
      </div>
    </Card>
  );
};

export default ReportTile