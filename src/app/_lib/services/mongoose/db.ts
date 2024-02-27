import { Appointment } from "../../types";
import { Insurance } from "../../types/user-type";

interface IAppointmentService {
  createAppointment(payload: Appointment): Promise<Appointment>;
  getAppointments(
    doctor: string,
    patient: string
  ): Promise<Appointment[] | undefined>;
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

export class AppointmentService implements IAppointmentService {
  createAppointment(payload: Appointment): Promise<Appointment> {
    console.log(payload)
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
        if(data.error){
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
            new URLSearchParams({ field: field, value: value }).toString()
        );
        const data = await response.json();
        resolve(data.appointment);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAppointments(
    doctor: string,
    patient: string
  ): Promise<Appointment[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `/api/appointment?` +
            new URLSearchParams({ doctor: doctor, patient: patient }).toString()
        );
        const data = await response.json();
        resolve(data.appointments);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateAppointment(payload: Appointment): Promise<Appointment> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/appointment", {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
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

// export class InsuranceClaimService implements IInsuranceClaimService {

//   createInsuranceClaim(payload: Insurance): Promise<Insurance> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const response = await fetch("/api/insurance", {
//           method: "POST",
//           body: JSON.stringify(payload),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();
//         resolve(data.insurance);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// }