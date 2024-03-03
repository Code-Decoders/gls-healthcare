"use clidnt";
import * as React from "react";
import { AppointmentTile } from "../tiles";
import { AppointmentService } from "@/app/_lib/services/mongoose";
import { useAppProvider } from "@/app/providers";
import { Appointment } from "@/app/_lib/types";
import { playfairDisplay } from "@/app/_lib/utils";

const ReceptionistDashboard = () => {
  const [appointmentList, setAppointmentList] = React.useState<Appointment[]>(
    []
  );
  const {
    state: { user },
    setState,
  } = useAppProvider();

  React.useEffect(() => {
    async function fetchAppointments() {
      const appointmentService = new AppointmentService();
      const appointments = await appointmentService.getAppointmentByField(
        "receptionist",
        user?.id || ""
      );
      setAppointmentList(appointments || []);
    }

    fetchAppointments();
  });

  const handleAppointmentAction = async (
    id: string,
    action: "pending" | "approved" | "rejected" | "finish"
  ) => {
    setState((val) => ({
      ...val,
      appointments: val.appointments?.map((appointment) => {
        if (appointment.id === id) {
          appointment.status = action;
        }
        return appointment;
      }) ?? [],
    }));
    const appointmentService = new AppointmentService();
    const appointment = appointmentList.find(
      (appointment) => appointment.id === id
    );
    if (appointment) {
      appointment.status = action;
      await appointmentService.updateAppointment(appointment);
      setAppointmentList(
        appointmentList.map((appointment) => {
          if (appointment.id === id) {
            appointment.status = action;
          }
          return appointment;
        })
      );
    }
  };

  return (
    <div
      className="gap-5 w-full grid place-items-center  grid-cols-1"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <div className="w-full flex flex-col justify-start items-center max-w-[500px] h-full mt-16">
        <span
          className={`${playfairDisplay.className} md:text-5xl text-3xl font-bold mb-16`}
        >
          Appointments
        </span>
        {appointmentList.map((appointment, index) => (
          <AppointmentTile
            status={appointment.status}
            key={index}
            from={new Date(appointment.date).toLocaleTimeString()}
            id={appointment.id || ""}
            issue={appointment.issue}
            patientName={appointment.patientName}
            type="receptionist"
            to="10:00 PM"
            onApprove={(id) => handleAppointmentAction(id, "approved")}
            onReject={(id) => handleAppointmentAction(id, "rejected")}
          />
        ))}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
