export type User = {
  type: "doctor" | "patient" | "insurance" | "receptionist";
  id: string;
  username: string;
  email: string;
  city: string;
  address: string;
  contactNumber: string;
  fingerPrint: string;
  aadharNumber: string;
};

export type Patient = User & {
  dateOfBirth: string;
  contactNumber: string;
  prescriptions: Prescription[];
  reports: Report[];
};

export type Appointment = {
  doctor: string;
  patient: string;
  createdAt: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
};

export type Doctor = User & {
  patients: string[];
  hospitalName: string;
  appointments: Appointment[]
  receptionist: string;
};

export type Prescription = {
  doctorId: string;
  presecriptionUrl: string;
  prescriptionAccess: string[];
};

export type Report = {
  doctorId: string;
  reportUrl: string;
  reportAccess: string[];
}