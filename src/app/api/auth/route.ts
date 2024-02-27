import { NextRequest } from "next/server";
import { MongoDbInit } from "@/app/_lib/services/mongoose";
import { UserDb } from "@/app/_lib/services/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = MongoDbInit.getInstance();
    db.connect();

    const field = req.nextUrl.searchParams.get("field") || "";
    const value = req.nextUrl.searchParams.get("value");

    const userExists = await UserDb.find({ [field]: value});

    if (!userExists) {
      
      return NextResponse.json({ error: "User does not exist" });
    } else {
      
      return NextResponse.json({
        message: "Success",
        error: null,
        user: userExists,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
