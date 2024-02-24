//Commented would be used in the database schema;

import e from "express";

export type User = {
  type: "doctor" | "patient" | "insurance" | "receptionist";
  id?: string;
  username: string;
  email: string;
  city: string;
  address: string;
  contactNumber: string;
  fingerPrint: string;
};

// export type Patient = User & {
//   dateOfBirth: string;
//   contactNumber: string;
//   prescriptions: Prescription[];
//   reports: Report[];
//   appointment: Appointment[];
// aadharNumber: string;
// };

export type Appointment = {
  id?: string;
  doctor: string;
  date: string;
  time: string;
  patient: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected" | "finished";
};

export type Insurance = {
  id?: string;
  provider: string;
  insuranceName: string;
  insuranceId: string;
  patient: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected" | "claimed";
}

// export type Doctor = User & {
//   patients: string[];
//   hospitalName: string;
//   appointments: Appointment[]
//   receptionist: string;
// };

export type Prescription = {
  id?: string;
  doctorId: string;
  prescriptionUrl: string;
  prescriptionAccess: string[];
};

export type Report = {
  id?: string;
  patientId:  string;
  doctorId: string;
  reportUrl: string;
  reportAccess: string[];
}