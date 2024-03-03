import { NextRequest, NextResponse } from "next/server";
import { Report } from "@/app/_lib/types";
import { ReportDB } from "@/app/_lib/services/mongoose";
import { MongoDbInit } from "@/app/_lib/services/mongoose";

export async function POST(req: NextRequest) {
  try {
    const db = MongoDbInit.getInstance();
    db.connect();
    const reportPayload: Report = await req.json();
    let report;
    report = new ReportDB(reportPayload);
    console.log(report);
    await report.save();

    return NextResponse.json({
      message: "Success",
      report: report,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = MongoDbInit.getInstance();
    db.connect();

    let reports: Report[] = [];
    let report: Report | null = null;

    const from = req.nextUrl.searchParams.get("from");

    console.log(from);

    if (!from) {
      return NextResponse.json({
        error: "Invalid request, Required from",
      });
    }

    const appointmentId = req.nextUrl.searchParams.get("appointmentId");
    const doctorId = req.nextUrl.searchParams.get("doctorId");
    const patientId = req.nextUrl.searchParams.get("patientId");
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      report = await ReportDB.findOne({ id });
    } else if (appointmentId) {
      reports = await ReportDB.find({ appointmentId });
    } else if (doctorId) {
      reports = await ReportDB.find({ doctorId });
    } else if (patientId) {
      reports = await ReportDB.find({ patientId });
    }

    console.log(report || reports);
    if (!report && reports.length === 0) {
      return NextResponse.json({
        error: "Unauthorized",
      });
    }

    if (report && report.reportAccess.indexOf(from) === -1) {
      return NextResponse.json({
        status: 403,
        data: { error: "Unauthorized" },
      });
    }

    reports = reports.filter((r) => r.reportAccess.indexOf(from) !== -1);

    return NextResponse.json({
      message: "Success",
      report: report ? [report] : reports,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db = MongoDbInit.getInstance();
    db.connect();

    const reportPayload: Report = await req.json();

    const report = await ReportDB.findOne({ id: reportPayload.id });
    if (report) {
      Object.assign(report, reportPayload);
      await report.save();
    }

    return NextResponse.json({
      message: "Success",
      report: report,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const db = MongoDbInit.getInstance();
    db.connect();

    const id = req.nextUrl.searchParams.get("id");

    const report = await ReportDB.findOneAndDelete({ id });

    return NextResponse.json({ message: "Success", report: report });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
