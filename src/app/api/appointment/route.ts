import { NextRequest } from "next/server";
import { MongoDbInit, UserDb } from "@/app/_lib/services/mongoose";
import { Appointment, Doctor } from "@/app/_lib/types";
import { AppointmentDB } from "@/app/_lib/services/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const appointmentPayload: Appointment = await req.json();

    const db = MongoDbInit.getInstance();
    db.connect();

    const appointmentExists: Appointment | null = await AppointmentDB.findOne({
      patient: appointmentPayload.patient,
      doctor: appointmentPayload.doctor,
    });

    const doctor: Doctor | null = await UserDb.findOne<Doctor | null>({
      id: appointmentPayload.doctor,
    });
    console.log();

    if (
      appointmentExists &&
      (appointmentExists as unknown as Appointment).status === "pending"
    ) {
      return NextResponse.json({
        error: "Appointment with doctor already exists",
      });
    }

    const parsedAppointment = {
      ...appointmentPayload,
      receptionist: (doctor as any).toObject().receptionist,
    };

    console.log(parsedAppointment);

    const appointment = new AppointmentDB(parsedAppointment);
    await appointment.save();

    return NextResponse.json({ message: "Success", appointment: appointment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    let appointments: Appointment[] = [];
    let appointment: Appointment | null = null;
    const db = MongoDbInit.getInstance();
    db.connect();

    const doctor = req.nextUrl.searchParams.get("doctor");
    const patient = req.nextUrl.searchParams.get("patient");
    const id = req.nextUrl.searchParams.get("id");
    const field = req.nextUrl.searchParams.get("field");
    const value = req.nextUrl.searchParams.get("value");

    if (id) {
      appointment = await AppointmentDB.findOne({
        id: id,
      });
    } else if (doctor) {
      appointments = await AppointmentDB.find({ doctor: doctor });
    } else if (patient) {
      appointments = await AppointmentDB.find({ patient: patient });
    } else if (field && value) {
      appointments = await AppointmentDB.find({ [field]: value });
    } else {
      appointment = await AppointmentDB.findOne({
        doctor: req.nextUrl.searchParams.get("doctor"),
        patient: req.nextUrl.searchParams.get("patient"),
      });
    }

    console.log("This is the appointment", appointments);
    return NextResponse.json({
      message: "Success",
      error: null,
      appointment: appointment || appointments || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const appointmentPayload: Appointment = await req.json();

    const db = MongoDbInit.getInstance();
    db.connect();

    const appointment = await AppointmentDB.findOneAndUpdate(
      { id: appointmentPayload.id },
      appointmentPayload,
      { new: true }
    );

    return NextResponse.json({ message: "Success", appointment: appointment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const appointmentPayloadId: string =
      req.nextUrl.searchParams.get("id") || "";

    const db = MongoDbInit.getInstance();
    db.connect();

    const appointment = await AppointmentDB.findOneAndDelete({
      _id: appointmentPayloadId,
    });

    return NextResponse.json({ message: "Success", appointment: appointment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
