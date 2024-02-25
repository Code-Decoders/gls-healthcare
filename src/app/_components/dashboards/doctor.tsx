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
  getKeyValue
} from "@nextui-org/react";
import { AppointmentTile } from "../tiles";
import { IoIosPeople } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { RiFirstAidKitFill } from "react-icons/ri";
const DoctorDashboard = () => {
  const [patientList, setPatientList] = React.useState([
    {
      key: 1,
      patientName: "John Doe",
      age: 22,
      issue: "Headache",
      from: "10:00",
      to: "10:30",
    },
    {
      key: 2,
      patientName: "John Doe",
      issue: "Headache",
      age: 29,
      from: "12:00",
      to: "12:30",
    },
    {
      key: 3,
      patientName: "John Doe",
      age: 49,
      issue: "Stomach ache",
      from: "15:00",
      to: "15:30",
    },
  ]);

  const columns = [
    {
      key: "patientName",
      label: "Name",
    },
    {
      key: "age",
      label: "Age",
    },
    {
      key: "issue",
      label: "Issue",
    },
    {
      key: "from",
      label: "From",
    },
    {
      key: "to",
      label: "To",
    },
  ];

  return (
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
        {patientList.map((patient, index) => (
          <AppointmentTile
            onTileClick={() => {
              console.log("Tile Clicked");
            }}
            key={index}
            patientName={patient.patientName}
            issue={patient.issue}
            from={patient.from}
            to={patient.to}
          />
        ))}
      </div>
      <Divider orientation="vertical" className="h-full" />
      <div className="flex flex-col gap-10 flex-1 md:p-10 p-5 max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div className="flex-col flex gap-2">
            <span className="text-2xl md:text-4xl font-bold">
              Hello, Dr. Martin
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
              <span className="md:text-2xl text-xl font-bold">146</span>
            </div>
          </div>
          <Divider orientation="vertical" className="ml-3 mr-3" />
          <div className="flex flex-row gap-5 flex-[0.33] justify-between">
            <span className="p-4 rounded-md bg-blue-100">
              <LuCalendarClock size={24} color="blue" />
            </span>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-sm text-gray-400">Total Appointments</span>
              <span className="md:text-2xl text-xl font-bold">231</span>
            </div>
          </div>
          <Divider orientation="vertical" className="ml-3 mr-3" />
          <div className="flex flex-row gap-5 flex-[0.33] justify-between">
            <span className="p-4 rounded-md bg-blue-100">
              <RiFirstAidKitFill size={24} color="blue" />
            </span>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-sm text-gray-400">Reports</span>
              <span className="md:text-2xl text-xl font-bold">200</span>
            </div>
          </div>
        </div>
        <Table isStriped aria-label="Patient list table">
          <TableHeader >
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={patientList} >
            {(item: { [key: string]: any }) => (
              <TableRow key={item.key}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
