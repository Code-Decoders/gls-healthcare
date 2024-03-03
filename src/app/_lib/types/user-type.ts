export enum UserType {
  DOCTOR = "doctor",
  RECEPTIONIST = "receptionist",
  PATIENT = "patient",
  INSURANCE_COMPANY = "insurance_company",
}

export type User = {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  address?: string;
  contactNumber: string;
  isActive?: Boolean;
  isBlocked?: Boolean;
  type: UserType;
  createdAt?: Date;
};

export type Patient = User & {
  reports: Report[];
  prescriptions: Prescription[];
};

export type Doctor = User & {
  appointments: Appointment[];
  patients: string[];
  receptionist: string;
  reports: Report[];
};

export type Receptionist = User & {
  appointments: Appointment[];
  doctors: string[];
};

export type InsuranceCompany = User & {
  claims: string[];
};

export type Insurance = {
  claimant?: string;
  id?: string;
  patient: string;
  provider: string;
  date: Date;
  amount: number;
  status: "pending" | "approved" | "rejected";
  detail: string;
  createdAt: Date;
};

export type Report = {
  id?: string;
  reportTitle: string;
  patientId: string;
  doctorId: string;
  reportUrl: string;
  reportAccess: string[];
  appointmentId: string;
};

export type Prescription = {
  id?: string;
  patientId: string;
  doctorId: string;
  prescriptionUrl: string;
  prescriptionAccess: string[];
};

export type Appointment = {
  id?: string;
  doctor: string;
  patientName: string;
  patient: string;
  receptionist: string;
  issue: string;
  description?: string;
  date: Date;
  time: Date;
  status: "pending" | "approved" | "rejected" | "finish";
};
