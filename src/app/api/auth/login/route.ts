import { NextRequest } from "next/server";
import { MongoDbInit } from "@/app/_lib/services/mongoose";
import { User } from "@/app/_lib/types";
import { NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
) {
  try {
    console.log(await req.json());

    return NextResponse.json({ message: "Success" });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
