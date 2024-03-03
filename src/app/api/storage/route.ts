import { NextRequest, NextResponse } from "next/server";
import { NFTStorageService } from "@/app/_lib/services/mongoose";

export async function POST(req: NextRequest) {

    const  file = await req.json()

    console.log(file)

}
