import MongoDbInit from "./initDb";
import UserDb from "./schemas/User";
import { UserSchema } from "./schemas/User";
import { AppointmentSchema } from "./schemas/Appointment";
import InsuranceDB, { InsuranceSchema } from "./schemas/Insurance";
import AppointmentDB from "./schemas/Appointment";
import ReportDB, { ReportSchema } from "./schemas/Report";
import { NFTStorageService } from "./initDb";
import { AppointmentService, InsuranceClaimService, ReportService } from "./db";

export {
  MongoDbInit,
  UserDb,
  UserSchema,
  AppointmentSchema,
  AppointmentDB,
  AppointmentService,
  InsuranceDB,
  InsuranceSchema,
  InsuranceClaimService,
  ReportDB,
  ReportSchema,
  NFTStorageService,
  ReportService,
};
