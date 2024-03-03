"use client";
import * as React from "react";
import {
  Divider,
  Table,
  TableHeader,
  TableRow,
  TableColumn,
  TableCell,
  TableBody,
} from "@nextui-org/react";
import { AppointmentTile } from "../tiles";
import { IoIosPeople } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { RiFirstAidKitFill } from "react-icons/ri";
import {
  AppointmentService,
  ReportService,
} from "@/app/_lib/services/mongoose";
import { Appointment } from "@/app/_lib/types";
import { useAppProvider } from "@/app/providers";
import Loading from "./loading";
import { useRouter } from "next/navigation";

const DoctorDashboard = () => {
  const [appointmentList, setAppointmentList] = React.useState<
    Appointment[] | undefined
  >([]);
  const [reports, setReports] = React.useState<Report[] | any[]>([]);
  const {
    state: { user },
  } = useAppProvider();

  const router = useRouter();

  const columns = [
    {
      key: "patientName",
      label: "Name",
    },
    {
      key: "issue",
      label: "Issue",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "time",
      label: "Time",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const parseDateAndValue = (value: string, isTime?: boolean) => {
    const date = new Date(value);
    if (date.toString() === "Invalid Date") return value;
    else if (isTime) return date.toLocaleTimeString();
    else return date.toDateString();
  };

  React.useEffect(() => {
    const appointmentService = new AppointmentService();
    const reportService = new ReportService();
    const fetchData = async () => {
      const appointmentsPromise = appointmentService.getAppointments({
        doctor: user?.id,
      });
      const reportsPromise = reportService.getReports({
        doctor: user?.id,
        from: user?.id || "",
      });

      const [appointments, reports] = await Promise.all([
        appointmentsPromise,
        reportsPromise,
      ]);

      const filteredAppointments = appointments?.filter(
        (val) => val.status !== "finish"
      );

      setAppointmentList(filteredAppointments);
      setReports(reports || []);
    };
    fetchData();
  }, [user?.id]);

  return !user ? (
    <Loading />
  ) : (
    <div
      className="w-full flex flex-row"
      style={{
        height: "calc(100% - 70px)",
      }}
    >
      <div className="hidden flex-col w-[25%] h-full md:flex">
        <span className="text-xl font-semibold text-gray-400 dark:text-light pl-5 mt-5">
          Appointments
        </span>
        {appointmentList &&
          appointmentList
            .filter((val) => val.status !== "finish")
            .map((patient, index) => (
              <AppointmentTile
                id={patient.id || ""}
                status={patient.status as any}
                key={index}
                patientName={patient.patientName}
                issue={patient.issue}
                from={new Date(patient.date).toLocaleDateString()}
                type="doctor"
                onFinish={(id) =>
                  router.push(
                    "/dashboard/reports/new?" +
                      new URLSearchParams({
                        appointment: id,
                        patient: patient.patient,
                      }).toString()
                  )
                }
              />
            ))}
      </div>
      <Divider orientation="vertical" className="h-full" />
      <div className="flex flex-col gap-10 flex-1 md:p-10 p-5 max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div className="flex-col flex gap-2">
            <span className="text-2xl md:text-4xl font-bold">
              Hello, Dr. {user.firstName}
            </span>
            <span className="md:text-xl text-sm text-gray-400">
              Hello there! Have a good day.
            </span>
          </div>
          <span className="bg-white rounded-md border-1 border-solid border-gray-300 px-5 grid place-items-center font-bold text-blue-500">
            {new Date(Date.now()).toDateString()}
          </span>
        </div>
        <div className="flex flex-row border-1 border-solid border-gray-200 rounded-md p-5">
          <div className="flex flex-row gap-5 flex-[0.33] justify-between">
            <span className="p-4 rounded-md bg-blue-100">
              <IoIosPeople size={24} color="blue" />
            </span>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-sm text-gray-400">Total Patients</span>
              <span className="md:text-2xl text-xl font-bold">
                {appointmentList?.length}
              </span>
            </div>
          </div>
          <Divider orientation="vertical" className="ml-3 mr-3" />
          <div className="flex flex-row gap-5 flex-[0.33] justify-between">
            <span className="p-4 rounded-md bg-blue-100">
              <LuCalendarClock size={24} color="blue" />
            </span>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-sm text-gray-400">Total Appointments</span>
              <span className="md:text-2xl text-xl font-bold">
                {appointmentList?.length || 0}
              </span>
            </div>
          </div>
          <Divider orientation="vertical" className="ml-3 mr-3" />
          <div className="flex flex-row gap-5 flex-[0.33] justify-between">
            <span className="p-4 rounded-md bg-blue-100">
              <RiFirstAidKitFill size={24} color="blue" />
            </span>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-sm text-gray-400">Reports</span>
              <span className="md:text-2xl text-xl font-bold">
                {reports.length}
              </span>
            </div>
          </div>
        </div>
        <Table isStriped aria-label="Patient list table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={appointmentList}>
            {(item: { [key: string]: any }) => (
              <TableRow key={item.id}>
                {columns.map((column) => {
                  const isDate =
                    String(new Date(item[column.key])) !== "Invalid Date";
                  return (
                    <TableCell key={column.key}>
                      {parseDateAndValue(
                        item[column.key],
                        column.key === "time"
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
