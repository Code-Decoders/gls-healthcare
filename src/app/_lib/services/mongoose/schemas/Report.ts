import mongoose from "mongoose";
import { Report } from "@/app/_lib/types";
import { v4 as uuid4 } from "uuid";

export const ReportSchema = new mongoose.Schema<Report>({
  appointmentId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  reportAccess: {
    type: [String],
    required: true,
  },
  reportTitle: {
    type: String,
    required: true,
  },
  reportUrl: {
    type: String,
    required: true,
  },
});

ReportSchema.pre("save", function (next) {
  const report = this as any;


  if (report.reportAccess.indexOf(report.patientId) === -1) {
    report.reportAccess.push(report.patientId);
  }
  if (report.reportAccess.indexOf(report.doctorId) === -1) {
    report.reportAccess.push(report.doctorId);
  }

  next();
}); 

const ReportDB =
  mongoose.models?.Report || mongoose.model<Report>("Report", ReportSchema);

export default ReportDB;
