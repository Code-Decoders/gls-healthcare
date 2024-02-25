import { NextRequest } from "next/server";
import { MongoDbInit } from "@/app/_lib/services/mongoose";
import { User } from "@/app/_lib/types";
import { UserDb } from "@/app/_lib/services/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userPayload: User = await req.json();

    const db = MongoDbInit.getInstance();
    db.connect();

    const userExists = await UserDb.findOne({ email: userPayload.email });
    if (userExists) {
      return NextResponse.json({ error: "User already exists" });
    }

    const user = new UserDb(userPayload);
    await user.save();

    return NextResponse.json({ message: "Success", user: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
