import * as React from "react";
import { UserType } from "@/app/lib/types";
import {
  PatientDashboard,
  DoctorDashboard,
  ReceptionistDashboard,
  InsuranceDashboard,
} from "@/app/components/dashboards";

const Dashboard: React.FC = () => {
  const userType: UserType = UserType.DOCTOR;

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
