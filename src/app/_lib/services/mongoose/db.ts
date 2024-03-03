import { Appointment } from "../../types";
import { Insurance } from "../../types/user-type";
import { Report } from "../../types/user-type";

const baseFabricApiUrl = "http://localhost:3001/";

interface IAppointmentService {
  createAppointment(payload: Appointment): Promise<Appointment>;
  getAppointments({
    doctor,
    patient,
  }: {
    doctor?: string;
    patient?: string;
  }): Promise<Appointment[] | undefined>;
  updateAppointment(payload: Appointment): Promise<Appointment>;
  deleteAppointment(id: string): Promise<Appointment>;
  getAppointmentByField(
    field: string,
    value: string
  ): Promise<Appointment[] | undefined>;
}

interface IInsuranceClaimService {
  createInsuranceClaim(payload: Insurance): Promise<Insurance>;
  getInsuranceClaims(
    patient: string,
    provider: string
  ): Promise<Insurance[] | undefined>;
  updateInsuranceClaim(payload: Insurance): Promise<Insurance>;
  deleteInsuranceClaim(id: string): Promise<Insurance>;
  getInsuranceClaimByField(
    field: string,
    value: string
  ): Promise<Insurance[] | undefined>;
}

interface IReportService {
  createReport(payload: Report): Promise<Report>;
  getReportsByField(
    field: string,
    value: string
  ): Promise<Report[] | undefined>;
  getReports({
    patient,
    from,
    doctor,
  }: {
    patient?: string;
    doctor?: string;
    from: string;
  }): Promise<Report[] | undefined>;
  updateReport(payload: Report): Promise<Report>;
  deleteReport(id: string): Promise<Report>;
}

export class AppointmentService implements IAppointmentService {
  createAppointment(payload: Appointment): Promise<Appointment> {
    console.log(payload);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/appointment", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.appointment);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAppointmentByField(
    field: string,
    value: string
  ): Promise<Appointment[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/appointment?` +
            new URLSearchParams({ field: field, value: value }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        resolve(data.appointment);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAppointments({
    doctor,
    patient,
  }: {
    doctor?: string;
    patient?: string;
  }): Promise<Appointment[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/appointment?` +
            new URLSearchParams({
              doctor: doctor || "",
              patient: patient || "",
            }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.appointment);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateAppointment(payload: Appointment): Promise<Appointment> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(payload);
        const response = await fetch("/api/appointment", {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const data = await response.json();
        resolve(data.appointment);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteAppointment(id: string): Promise<Appointment> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/appointment?id=${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        resolve(data.appointment);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export class InsuranceClaimService implements IInsuranceClaimService {
  createInsuranceClaim(payload: Insurance): Promise<Insurance> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(payload);
        const response = await fetch("/api/insurance", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          console.log(data);
          reject(data.error);
        }
        console.log(data);
        resolve(data.insurance);
      } catch (error) {
        reject(error);
      }
    });
  }

  getInsuranceClaimByField(
    field?: string,
    value?: string
  ): Promise<Insurance[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/insurance?` +
            new URLSearchParams({
              field: field || "",
              value: value   || "",
            }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        resolve(data.insurance);
      } catch (error) {
        reject(error);
      }
    });
  }

  getInsuranceClaims(
    patient?: string,
    provider?: string
  ): Promise<Insurance[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/insurance?` +
            new URLSearchParams({
              patient: patient || "",
              provider: provider || "",
            }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        resolve(data.insurance);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateInsuranceClaim(payload: Insurance): Promise<Insurance> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/insurance", {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        resolve(data.insurance);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteInsuranceClaim(id: string): Promise<Insurance> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/insurance?id=${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        resolve(data.insurance);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export class ReportService implements IReportService {
  createReport(payload: Report): Promise<Report> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/report", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.report);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteReport(id: string): Promise<Report> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/report?id=${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.report);
      } catch (error) {
        reject(error);
      }
    });
  }

  getReports({
    patient,
    doctor,
    from,
  }: {
    patient?: string;
    doctor?: string;
    from: string;
  }): Promise<Report[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/report?` +
            new URLSearchParams({
              patientId: patient || "",
              doctorId: doctor || "",
              from: from,
            }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.report);
      } catch (error) {
        reject(error);
      }
    });
  }

  getReportsByField(
    field: string,
    value: string
  ): Promise<Report[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/report?` +
            new URLSearchParams({ field: field, value: value }).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.report);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateReport(payload: Report): Promise<Report> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/report", {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          reject(data.error);
        }
        resolve(data.report);
      } catch (error) {
        reject(error);
      }
    });
  }
}
