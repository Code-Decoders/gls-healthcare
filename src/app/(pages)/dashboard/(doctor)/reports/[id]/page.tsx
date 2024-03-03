"use client";
import * as React from "react";
import { playfairDisplay } from "@/app/_lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { Appointment, Report } from "@/app/_lib/types";
import { useAppProvider } from "@/app/providers";
import {
  AppointmentService,
  NFTStorageService,
} from "@/app/_lib/services/mongoose";
import { ReportService } from "@/app/_lib/services/mongoose";
import { v4 as uuid4 } from "uuid";

const ReportDetail: React.FC = () => {
  const { id } = useParams();
  const params = useSearchParams();
  let [appointment, setAppointment] = React.useState<any>({});
  const {
    state: { user },
    setState,
  } = useAppProvider();

  const isNew = id === "new";
  const ref = React.useRef(null);

  const [newReport, setNewReport] = React.useState<Report>({
    appointmentId: params.get("appointment") || "",
    patientId: params.get("patient") || "",
    doctorId: user?.id || "",
    reportAccess: [params.get("patient") || "", user?.id || ""],
    reportTitle: "",
    reportUrl: "",
    id: uuid4(),
  });

  const [fileName, setFileName] = React.useState<string>("");

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nftStorageService = new NFTStorageService();

    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      try {
        const uid = await nftStorageService.upload(e.target.files);
        if (uid)
          setNewReport({
            ...newReport,
            reportUrl: "https://gateway.lighthouse.storage/ipfs/" + uid,
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportService = new ReportService();
    const appointmentService = new AppointmentService();

    try {
      if (isNew) {
        const updatedAppointment: Appointment = {
          ...appointment[0],
          status: "finish",
        };
        reportService.createReport(newReport).then(() => {
          appointmentService.updateAppointment(updatedAppointment).then(() => {
            alert("Report Created Successfully");
            setState((val) => ({
              ...val,
              appointments: val.appointments?.map((app: Appointment) => {
                if (app.id === params.get("appointment")) {
                  return {
                    ...app,
                    status: "finish",
                  };
                }
                return app;
              }),
            }));
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    const appointmentService = new AppointmentService();

    const fetchAppointment = async () => {
      const appoint = await appointmentService.getAppointmentByField(
        "id",
        params.get("appointment") || ""
      );
      setAppointment(appoint);
    };

    fetchAppointment();
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center justify-start"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <span
        className={`md:text-5xl text-3xl ${playfairDisplay.className} mt-16 mb-16`}
      >
        {isNew ? "Create" : "View"} Report
      </span>
      <form
        onSubmit={onSubmit}
        className="flex-1 w-full flex flex-col gap-6 max-w-[500px]"
      >
        <Input
          label="Report Title"
          labelPlacement="outside"
          placeholder="Enter Report Title"
          value={newReport.reportTitle}
          required
          size="lg"
          onChange={(e) =>
            setNewReport({ ...newReport, reportTitle: e.target.value })
          }
        />
        <div className="border-1 border-dotted border-gray-500 rounded-xl h-16">
          <input
            className="hidden"
            ref={ref}
            onChange={uploadFile}
            type="file"
          />
          <div
            onClick={() => (ref.current as any)?.click()}
            className={`${playfairDisplay.className} grid place-items-center h-full cursor-pointer`}
          >
            {fileName || "Upload Report"}
          </div>
        </div>
        {isNew && (
          <Button type="submit" size="lg" className="bg-button">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default ReportDetail;
