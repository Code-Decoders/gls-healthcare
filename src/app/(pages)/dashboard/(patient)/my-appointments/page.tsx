"use client";
import * as React from "react";
import { useAppProvider } from "@/app/providers";
import { Patient } from "@/app/_lib/types";
import { AppointmentTile } from "@/app/_components/tiles";

const MyAppointments: React.FC = () => {
  const { state: { user}} = useAppProvider();

  const appointments = (user as Patient).appointments;

  return (
    <div className="container ">
      <h1>My Appointments{appointments?.toString()}</h1>
    </div>
  );
};

export default MyAppointments;
