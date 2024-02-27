import * as React from "react";
import { Doctor, InsuranceCompany, Patient, Receptionist, User } from ".";

export type AppStateType = {
  state: AppStateValue;
  setState: React.Dispatch<React.SetStateAction<AppStateValue>>;
};

export type AppStateValue = {
  user?: User | Patient | Doctor | Receptionist | InsuranceCompany;
  appointments?: any[];
};
