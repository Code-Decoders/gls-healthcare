import mongoose from "mongoose";
import { Insurance } from "@/app/_lib/types";
import { v4 as uuid4 } from "uuid";

export const InsuranceSchema = new mongoose.Schema<Insurance>(
  {
    claimant: {
      type: String,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    detail: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      default: uuid4(),
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

const InsuranceDB =
  mongoose.models?.Insurance ||
  mongoose.model<Insurance>("Insurance", InsuranceSchema);

export default InsuranceDB;
