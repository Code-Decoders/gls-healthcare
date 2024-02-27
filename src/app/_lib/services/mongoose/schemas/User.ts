import {
  User,
  UserType,
  Patient,
  Doctor,
  Receptionist,
  InsuranceCompany,
} from "@/app/_lib/types";
import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";
import { envOrDefault } from "@/app/_lib/utils";
import { AES } from "crypto-js";

const encryptSecret: string = envOrDefault("ENCRYPT_SECRET", "gls_health_care");

export const UserSchema: mongoose.Schema & {
  methods: {
    comparePassword?: (password: string) => boolean;
  };
} = new mongoose.Schema<User | Patient | Doctor | Receptionist | InsuranceCompany>(
  {
    id: {
      type: String,
      default: uuid4(),
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: UserType.PATIENT,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this as any;
  if (!user.isModified("password")) {
    return next();
  }

  if (user.password) {
    user.password = AES.encrypt(user.password, encryptSecret).toString();
  }

  if (!user.id) {
    user.id = uuid4();
  }
  next();
});

// UserSchema.methods.comparePassword = function (password: string): boolean {
//   const user = this as any;
//   const rawDecryptedPassword: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
//     user.password,
//     encryptSecret
//   );
//   const decryptedPassword = rawDecryptedPassword.toString(CryptoJS.enc.Utf8);
//   return password === decryptedPassword;
// };

const UserDb = mongoose.models?.User || mongoose.model("User", UserSchema);

export default UserDb;
