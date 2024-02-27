'use client'
import * as React from "react";
import { UserType } from "@/app/_lib/types";
import {
  PatientDashboard,
  DoctorDashboard,
  ReceptionistDashboard,
  InsuranceDashboard,
} from "@/app/_components/dashboards";
import { useAppProvider } from "@/app/providers";

const Dashboard: React.FC = () => {
  const { state } = useAppProvider()
  const userType = React.useMemo(() => state.user?.type, [state.user?.type]);
  console.log(state)

  switch (userType as UserType) {
    case UserType.DOCTOR:
      return <DoctorDashboard />;
    case UserType.RECEPTIONIST:
      return <ReceptionistDashboard />;
    case UserType.PATIENT:
      return <PatientDashboard />;
    case UserType.INSURANCE_COMPANY:
      return <InsuranceDashboard />;
  }
};

export default Dashboard;
