import mongoose from "mongoose";
import { Appointment } from "@/app/_lib/types";
import { v4 as uuid4 } from "uuid";

export const AppointmentSchema = new mongoose.Schema<Appointment>({
  patientName: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  patient: {
    type: String,
    ref: "User",
    required: true,
  },
  doctor: {
    type: String,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  id: {
    type: String,
  },
  receptionist: {
    type: String,
    required: true,
  },
});

AppointmentSchema.pre("save", function (next) {
  const appointment = this as any;

  if (!appointment.isModified("id")) {
    appointment.id = uuid4();
  }

  next();
});

const AppointmentDB =
  mongoose.models?.Appointment ||
  mongoose.model<Appointment>("Appointment", AppointmentSchema);

export default AppointmentDB;
