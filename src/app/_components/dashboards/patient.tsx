"use client";
import * as React from "react";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import { useAppProvider } from "@/app/providers";
import { Patient } from "@/app/_lib/types";

const PatientDashboard = () => {
  const { state } = useAppProvider();

  const user: Patient = React.useMemo(() => (state.user as Patient), [state.user]);
  const appointments = React.useMemo(() => user.appointments, [user.appointments]);

  return (
    <div
      className="w-full flex flex-col md:p-10 p-5"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-2">
          <span className="md:text-5xl text-2xl font-bold">
            Hello, {user.firstName}
          </span>
          <span className="text-medium text-gray-400">
            Track your appointments and reports, all from one place
          </span>
        </div>
        <div className="text-end">
          <span className="font-bold md:text-5xl text-2xl">5</span>
          <br />
          <span className="md:text-medium text-sm text-gray-400 font-medium">
            Available reports
          </span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-3 md:mt-[150px] mt-[50px]">
        <Card className="md:w-[33%] w-full h-fit  mt-5 flex flex-col md:p-5 p-2">
          <CardHeader className="text-2xl font-bold">Details</CardHeader>
          <CardBody className="flex flex-row md:gap-5 gap-3 w-full md:p-5 p-2 items-center">
            <Avatar src="https://picsum.photos/200/300" size="lg" />
            <div className="flex flex-col">
              <span>
                <span className="text-sm text-gray-400 font-medium">Name:</span>
                <br />
                <span className="font-bold lg:text-2xl md:text-2xl text-xl">
                  {state.user?.firstName} &nbsp; {state.user?.lastName}
                </span>
              </span>
              <span>
                <span className="md:text-medium text-sm text-gray-400 font-medium">
                  Reports:
                </span>
                <br />
                <span className="font-bold lg:text-2xl md:text-2xl text-xl">
                  20
                </span>
              </span>
            </div>
            <span className="mb-auto ml-auto mr-auto">
              <span className="md:text-medium text-sm text-gray-400 font-medium">
                Appointments:
              </span>
              <br />
              <span className="font-bold lg:text-2xl md:text-2xl text-xl">
                {appointments?.length}
              </span>
            </span>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
