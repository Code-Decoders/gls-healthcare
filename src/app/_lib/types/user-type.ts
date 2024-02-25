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
  type: UserType;
  createdAt?: Date;
}