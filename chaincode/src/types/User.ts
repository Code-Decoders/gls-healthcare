//Commented would be used in the database schema;

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
  patientName: string;
  patient: string;
  receptionist: string;
  issue: string;
  description?: string;
  date: Date;
  time: Date;
  status: "pending" | "approved" | "rejected" | "finish";
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

// export type Doctor = User & {
//   patients: string[];
//   hospitalName: string;
//   appointments: Appointment[]
//   receptionist: string;
// };

export type Prescription = {
  id?: string;
  patientId: string;
  doctorId: string;
  prescriptionUrl: string;
  prescriptionAccess: string[];
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
