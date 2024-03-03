import { NextRequest, NextResponse } from "next/server";
import { InsuranceDB } from "@/app/_lib/services/mongoose";
import { MongoDbInit } from "@/app/_lib/services/mongoose";
import { Insurance } from "@/app/_lib/types";

export async function POST(req: NextRequest) {
  const insurancePayload = await req.json();
  const db = MongoDbInit.getInstance();
  db.connect();
  let insurance;
  console.log(insurancePayload);

  try {
    insurance = new InsuranceDB<Insurance>(insurancePayload);
    await insurance.save();
    return NextResponse.json({ message: "Success", insurance: insurance });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}

export async function GET(req: NextRequest) {
  const db = MongoDbInit.getInstance();
  db.connect();

  const field = req.nextUrl.searchParams.get("field") || "";
  const value = req.nextUrl.searchParams.get("value");
  const provider = req.nextUrl.searchParams.get("provider");
  const patient = req.nextUrl.searchParams.get("patient");
  const id = req.nextUrl.searchParams.get("id");

  let insurance;

  try {
    if (provider) {
      insurance = await InsuranceDB.find({ provider: provider });
    } else if (patient) {
      insurance = await InsuranceDB.find({ patient: patient });
    } else if (id) {
      insurance = await InsuranceDB.findOne({ id: id });
    } else {
      insurance = await InsuranceDB.find({ [field]: value });
    }
    return NextResponse.json({ insurance: insurance });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function PUT(req: NextRequest) {
  const insurancePayload = await req.json();
  const db = MongoDbInit.getInstance();
  db.connect();
  let insurance;

  try {
    insurance = await InsuranceDB.findOneAndUpdate(
      { id: insurancePayload.id },
      insurancePayload,
      { new: true }
    );
    return NextResponse.json({ message: "Success", insurance: insurance });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function DELETE(req: NextRequest) {
  const insurancePayload = await req.json();
  const db = MongoDbInit.getInstance();
  db.connect();
  let insurance;

  try {
    insurance = await InsuranceDB.findOneAndDelete({ id: insurancePayload.id });
    return NextResponse.json({ message: "Success", insurance: insurance });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
