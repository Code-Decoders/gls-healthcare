import { NextRequest } from "next/server";
import { MongoDbInit } from "@/app/_lib/services/mongoose";
import { User } from "@/app/_lib/types";
import { UserDb } from "@/app/_lib/services/mongoose";
import { NextResponse } from "next/server";
import { envOrDefault } from "@/app/_lib/utils";
import CryptoJS from "crypto-js";

const encryptSecret: string = envOrDefault("ENCRYPT_SECRET", "gls_health_care");

export async function POST(req: NextRequest) {
  try {
    const userPayload: User = await req.json();

    const db = MongoDbInit.getInstance();
    db.connect();

    const userExists = await UserDb.findOne({ email: userPayload.email });
    if (!userExists) {
      return NextResponse.json({ error: "User does not exist" });
    }

    const rawDecryptedPassword: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
      userExists.password,
      encryptSecret
    );
    const decryptedPassword = rawDecryptedPassword.toString(CryptoJS.enc.Utf8);

    const  isPasswordMatch = userPayload.password === decryptedPassword;
    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Invalid password" });
    }

    return NextResponse.json({
      message: "Success",
      error: null,
      user: userExists,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
