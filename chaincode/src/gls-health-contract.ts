import { Contract, Context, Transaction } from "fabric-contract-api";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";
import { Appointment, Prescription, Report, Insurance } from "../types/User";

interface Response {
  txID: string;
  success: boolean;
  message: string;
  data: any;
}

class HealthCare extends Contract {
  @Transaction()
  async addUser(
    ctx: Context,
    type: "doctor" | "patient" | "insurance" | "receptionist",
    username: string,
    email: string,
    city: string,
    address: string,
    contactNumber: string,
    fingerPrint: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const userId = email;

    const dataAsBytes = await ctx.stub.getState(`${type}-` + userId);
    if (dataAsBytes.toString()) {
      response.message = `User with email ${email} already exists`;
      return response;
    }

    const doc: User = {
      id: userId,
      type,
      username,
      email,
      city,
      address,
      contactNumber,
      fingerPrint,
    };

    await ctx.stub.putState(
      `${type}-` + userId,
      Buffer.from(JSON.stringify(doc)),
    ),
      await ctx.stub.setEvent("AddUser", Buffer.from(JSON.stringify(doc)));

    response.message = `Successfully added ${type} with email ${email}`;
    response.success = true;
    return response;
  }

  //Appointment functions
  @Transaction()
  async createAppointment(
    ctx: Context,
    doctorId: string,
    patientId: string,
    receptionistEmail: string,
    date: string,
    time: string,
  ): Promise<any> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const receptionistId = receptionistEmail;

    const receptionistData = await ctx.stub.getState(
      `receptionist-` + receptionistId,
    );
    if (!receptionistData.toString()) {
      response.message = `Receptionist with id ${receptionistId} does not exist`;
      return response;
    }

    const receptionist: User = JSON.parse(receptionistData.toString());
    if (receptionist.type !== "receptionist") {
      response.message = `User with id ${receptionistId} is not a receptionist`;
      return response;
    }

    const doctorData = await ctx.stub.getState(`doctor-` + doctorId);
    if (!doctorData.toString()) {
      response.message = `Doctor with id ${doctorId} does not exist`;
      return response;
    }

    const patientData = await ctx.stub.getState("patient-" + patientId);
    if (!patientData.toString()) {
      response.message = `Patient with id ${patientId} does not exist`;
      return response;
    }

    const doctor: User = JSON.parse(doctorData.toString());

    const appointment: Appointment = {
      id: uuidv4(),
      doctor: doctorId,
      date,
      time,
      patient: patientId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    await ctx.stub.putState(
      "appointment-" + patientId + "-" + doctorId,
      Buffer.from(JSON.stringify(doctor)),
    );
    await ctx.stub.setEvent(
      "CreateAppointment",
      Buffer.from(JSON.stringify(appointment)),
    );

    response.message = `Successfully created appointment for patient with id ${patientId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async approveAppointment(
    ctx: Context,
    patientId: string,
    doctorId: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const appointmentId = "appointment-" + patientId + "-" + doctorId;

    const dataAsBytes = await ctx.stub.getState("");
    if (!dataAsBytes.toString()) {
      response.message = `Appointment with id ${appointmentId} does not exist`;
      return response;
    }

    const appointment: Appointment = JSON.parse(dataAsBytes.toString());
    appointment.status = "approved";

    await ctx.stub.putState(
      appointmentId,
      Buffer.from(JSON.stringify(appointment)),
    );
    await ctx.stub.setEvent(
      "ApproveAppointment",
      Buffer.from(JSON.stringify(appointment)),
    );

    response.message = `Successfully approved appointment with id ${appointmentId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async rejectAppointment(
    ctx: Context,
    doctorId: string,
    patientId: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const appointmentId = "appointment-" + patientId + "-" + doctorId;

    const dataAsBytes = await ctx.stub.getState(appointmentId);
    if (!dataAsBytes.toString()) {
      response.message = `Appointment with id ${appointmentId} does not exist`;
      return response;
    }

    const appointment: Appointment = JSON.parse(dataAsBytes.toString());
    appointment.status = "rejected";

    await ctx.stub.putState(
      appointmentId,
      Buffer.from(JSON.stringify(appointment)),
    );
    await ctx.stub.setEvent(
      "RejectAppointment",
      Buffer.from(JSON.stringify(appointment)),
    );

    response.message = `Successfully rejected appointment with id ${appointmentId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async finishAppointment(
    ctx: Context,
    doctorId: string,
    patientId: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const appointmentId = "appointment-" + patientId + "-" + doctorId;

    const dataAsBytes = await ctx.stub.getState(appointmentId);
    if (!dataAsBytes.toString()) {
      response.message = `Appointment with id ${appointmentId} does not exist`;
      return response;
    }

    const appointment: Appointment = JSON.parse(dataAsBytes.toString());
    appointment.status = "finished";

    await ctx.stub.putState(
      appointmentId,
      Buffer.from(JSON.stringify(appointment)),
    );
    await ctx.stub.setEvent(
      "FinishAppointment",
      Buffer.from(JSON.stringify(appointment)),
    );

    response.message = `Successfully finished appointment with id ${appointmentId}`;
    response.success = true;
    return response;
  }

  // Report functions
  @Transaction()
  async createReport(
    ctx: Context,
    doctorId: string,
    patientId: string,
    reportUrl: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const reportId = "report-" + patientId + "-" + Date.now();
    const reportAccess = [doctorId, patientId];

    const dataAsBytes = await ctx.stub.getState(doctorId);
    if (!dataAsBytes.toString()) {
      response.message = `Doctor with id ${doctorId} does not exist`;
      return response;
    }

    const doctor: User = JSON.parse(dataAsBytes.toString());
    if (doctor.type !== "doctor") {
      response.message = `User with id ${doctorId} is not a doctor`;
      return response;
    }

    const patientData = await ctx.stub.getState(patientId);
    if (!patientData.toString()) {
      response.message = `Patient with id ${patientId} does not exist`;
      return response;
    }

    const patient: User = JSON.parse(patientData.toString());

    const report: Report = {
      id: uuidv4(),
      patientId,
      doctorId,
      reportUrl,
      reportAccess,
    };

    await ctx.stub.putState(reportId, Buffer.from(JSON.stringify(patient)));
    await ctx.stub.setEvent(
      "CreateReport",
      Buffer.from(JSON.stringify(report)),
    );

    response.message = `Successfully created report for patient with id ${patientId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async updateReportAccess(
    ctx: Context,
    patientEmail: string,
    doctorEmail: string,
    reportAccess: string[],
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const reportId = "report-" + patientEmail + "-" + doctorEmail;

    const dataAsBytes = await ctx.stub.getState(reportId);
    if (!dataAsBytes.toString()) {
      response.message = `Report with id ${reportId} does not exist`;
      return response;
    }

    const report: Report = JSON.parse(dataAsBytes.toString());
    report.reportAccess = reportAccess;

    await ctx.stub.putState(reportId, Buffer.from(JSON.stringify(report)));
    await ctx.stub.setEvent(
      "UpdateReportAccess",
      Buffer.from(JSON.stringify(report)),
    );

    response.message = `Successfully updated report access for report with id ${reportId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async deleteReport(
    ctx: Context,
    reportId: string,
    patientEmail: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    //Check if requestor is the owner of the report
    const dataAsBytes = await ctx.stub.getState("report-" + reportId);
    if (!dataAsBytes.toString()) {
      response.message = `Report with id ${reportId} does not exist`;
      return response;
    }

    const report: Report = JSON.parse(dataAsBytes.toString());
    if (report.patientId !== patientEmail) {
      response.message = `You do not have access to report with id ${reportId}`;
      return response;
    }

    await ctx.stub.deleteState("report-" + reportId);
    await ctx.stub.setEvent("DeleteReport", Buffer.from(reportId));

    response.message = `Successfully deleted report with id ${reportId}`;
    response.success = true;
    return response;
  }

  // Prescription functions
  @Transaction()
  async createPrescription(
    ctx: Context,
    doctorId: string,
    patientId: string,
    prescriptionUrl: string,
    prescriptionAccess: string[],
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const prescriptionId = "prescription-" + patientId + "-" + doctorId;

    const dataAsBytes = await ctx.stub.getState(doctorId);
    if (!dataAsBytes.toString()) {
      response.message = `Doctor with id ${doctorId} does not exist`;
      return response;
    }

    const doctor: User = JSON.parse(dataAsBytes.toString());
    if (doctor.type !== "doctor") {
      response.message = `User with id ${doctorId} is not a doctor`;
      return response;
    }

    const patientData = await ctx.stub.getState(patientId);
    if (!patientData.toString()) {
      response.message = `Patient with id ${patientId} does not exist`;
      return response;
    }

    const patient: User = JSON.parse(patientData.toString());

    const prescription: Prescription = {
      id: uuidv4(),
      doctorId,
      prescriptionUrl,
      prescriptionAccess,
    };

    await ctx.stub.putState(
      prescriptionId,
      Buffer.from(JSON.stringify(patient)),
    );
    await ctx.stub.setEvent(
      "CreatePrescription",
      Buffer.from(JSON.stringify(prescription)),
    );

    response.message = `Successfully created prescription for patient with id ${patientId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async updatePrescriptionAccess(
    ctx: Context,
    prescriptionId: string,
    prescriptionAccess: string[],
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    const dataAsBytes = await ctx.stub.getState(prescriptionId);
    if (!dataAsBytes.toString()) {
      response.message = `Prescription with id ${prescriptionId} does not exist`;
      return response;
    }

    const prescription: Prescription = JSON.parse(dataAsBytes.toString());
    prescription.prescriptionAccess = prescriptionAccess;

    await ctx.stub.putState(
      prescriptionId,
      Buffer.from(JSON.stringify(prescription)),
    );
    await ctx.stub.setEvent(
      "UpdatePrescriptionAccess",
      Buffer.from(JSON.stringify(prescription)),
    );

    response.message = `Successfully updated prescription access for prescription with id ${prescriptionId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async deletePrescription(
    ctx: Context,
    prescriptionId: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    await ctx.stub.deleteState(prescriptionId);
    await ctx.stub.setEvent("DeletePrescription", Buffer.from(prescriptionId));

    response.message = `Successfully deleted prescription with id ${prescriptionId}`;
    response.success = true;
    return response;
  }

  // Insurance functions
  @Transaction()
  async createInsurance(
    ctx: Context,
    provider: string,
    insuranceName: string,
    insuranceId: string,
    patientId: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const insuranceStorageId =
      "insurance-" + patientId + "-" + provider + "-" + insuranceId;

    const insurance: Insurance = {
      id: uuidv4(),
      provider,
      insuranceName,
      insuranceId,
      patient: patientId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    const insuranceProviderData = await ctx.stub.getState(provider);
    if (
      !insuranceProviderData.toString() ||
      JSON.parse(insuranceProviderData.toString()).type !== "insurance"
    ) {
      response.message = `Insurance provider with id ${provider} does not exist`;
      return response;
    }
    const patientData = await ctx.stub.getState(patientId);
    if (!patientData.toString()) {
      response.message = `Patient with id ${patientId} does not exist`;
      return response;
    }

    await ctx.stub.putState(
      insuranceStorageId,
      Buffer.from(JSON.stringify(insurance)),
    );

    await ctx.stub.setEvent(
      "CreateInsurance",
      Buffer.from(JSON.stringify(insurance)),
    );

    response.message = `Successfully created insurance for patient with id ${patientId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async approveInsurance(ctx: Context, insuranceId: string): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    const dataAsBytes = await ctx.stub.getState(insuranceId);
    if (!dataAsBytes.toString()) {
      response.message = `Insurance with id ${insuranceId} does not exist`;
      return response;
    }

    const insurance: Insurance = JSON.parse(dataAsBytes.toString());
    insurance.status = "approved";

    await ctx.stub.putState(
      insuranceId,
      Buffer.from(JSON.stringify(insurance)),
    );
    await ctx.stub.setEvent(
      "ApproveInsurance",
      Buffer.from(JSON.stringify(insurance)),
    );

    response.message = `Successfully approved insurance with id ${insuranceId}`;
    response.success = true;
    return response;
  }

  @Transaction()
  async rejectInsurance(ctx: Context, insuranceId: string): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    const dataAsBytes = await ctx.stub.getState(insuranceId);
    if (!dataAsBytes.toString()) {
      response.message = `Insurance with id ${insuranceId} does not exist`;
      return response;
    }

    const insurance: Insurance = JSON.parse(dataAsBytes.toString());
    insurance.status = "rejected";

    await ctx.stub.putState(
      insuranceId,
      Buffer.from(JSON.stringify(insurance)),
    );
    await ctx.stub.setEvent(
      "RejectInsurance",
      Buffer.from(JSON.stringify(insurance)),
    );

    response.message = `Successfully rejected insurance with id ${insuranceId}`;
    response.success = true;
    return response;
  }

  // Get functions
  @Transaction(false)
  async getReport(
    ctx: Context,
    patientEmail: string,
    doctorEmail: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const reportId = "report-" + patientEmail + "-" + doctorEmail;

    const dataAsBytes = await ctx.stub.getState(reportId);
    if (!dataAsBytes.toString()) {
      response.message = `Report with id ${reportId} does not exist`;
      return response;
    }

    const report: Report = JSON.parse(dataAsBytes.toString());
    if (!report.reportAccess.includes(doctorEmail)) {
      response.message = `You do not have access to report with id ${reportId}`;
      return response;
    }

    response.message = `Successfully fetched report with id ${reportId}`;
    response.data = report;
    response.success = true;
    return response;
  }

  @Transaction(false)
  async getPatientPrescriptions(
    ctx: Context,
    patientEmail: string,
    doctorEmail: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const prescriptionId = "prescription-" + patientEmail;
    const queryString = `
    "selector": {
      "type": "prescription",
      "id": "${prescriptionId}"
    }
    `
    let recordCount = 0;

   const queryResult = (await ctx.stub.getQueryResult(queryString));
    let results: Prescription[] = [];
    
    while (true) {
      let res = await queryResult.next();

      if (res.value && res.value.value.toString()) {
        let prescription: Prescription;

        try {
          prescription = JSON.parse(res.value.value.toString());
          recordCount++;
        } catch (err) {
          response.message = `Error while unmarshalling prescription: ${err}`;
          return response;
        }

        results.push(prescription);
      }

      if (res.done) {
        await queryResult.close();
        response.message = `Successfully fetched prescriptions for patient with id ${patientEmail}`;
        response.data = {
          data: results,
          recordCount: recordCount,
        };
        response.success = true;
        return response;
      }
    }
  }

  @Transaction(false)
  async getUserInsurances(
    ctx: Context,
    patientEmail: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    const queryString = `
    "selector": {
      "id": "insurance-${patientEmail}"
    }
    `;
    const queryResult = (await ctx.stub.getQueryResult(queryString));
    let recordCount = 0;
    let results: Insurance[] = [];

    while (true) {
      let res = await queryResult.next();

      if (res.value && res.value.value.toString()) {
        let insurance: Insurance;

        try {
          insurance = JSON.parse(res.value.value.toString());
          recordCount++;
        } catch (err) {
          response.message = `Error while unmarshalling insurance: ${err}`;
          return response;
        }

        results.push(insurance);
      }

      if (res.done) {
        await queryResult.close();
        response.data = {
          data: results,
          recordCount: recordCount,
        };
        response.success = true;
        return response;
      }
    }
  }

  @Transaction(false)
  async getUserAppointments(ctx: Context, patientEmail: string):  Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    const queryString = `
    "selector": {
      "id": "appointment-${patientEmail}"
    `; 
    const queryResult = (await ctx.stub.getQueryResult(queryString));
    let recordCount = 0;
    let results: Appointment[] = [];

    while (true) {
      let res = await queryResult.next();

      if (res.value && res.value.value.toString()) {
        let appointment: Appointment;

        try {
          appointment = JSON.parse(res.value.value.toString());
          recordCount++;
        } catch (err) {
          response.message = `Error while unmarshalling appointment: ${err}`;
          return response;
        }

        results.push(appointment);
      }

      if (res.done) {
        await queryResult.close();
        response.data = {
          data: results,
          recordCount: recordCount,
        };
        response.success = true;
        return response;
      }
    }
  }

  @Transaction(false)
  async getAllDoctors(
    ctx: Context,
    pageSize: number,
    bookmark: string,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const queryString = `{
            "selector": {
                "type":"doctor"
            }
        }`;

    const { iterator, metadata } = await ctx.stub.getQueryResultWithPagination(
      queryString,
      pageSize,
      bookmark,
    );
    let results: User[] = [];

    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let doc: User;

        try {
          doc = JSON.parse(res.value.value.toString());
        } catch (err) {
          response.message = `Error while unmarshalling user: ${err}`;
          return response;
        }

        results.push(doc);
      }

      if (res.done) {
        await iterator.close();
        response.message = "Successfully fetched users";
        response.data = {
          data: results,
          recordCount: metadata.fetchedRecordsCount,
          bookmark: metadata.bookmark,
        };
        response.success = true
        return response;
      }
    }
  }

  @Transaction(false)
  async getUser(ctx: Context, email: string, type: string): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };
    const dataAsBytes = await ctx.stub.getState(`${type}-${email}`);
    if (!dataAsBytes.toString()) {
      response.message = `User with email ${email} does not exist`;
      return response;
    }

    const user: User = JSON.parse(dataAsBytes.toString());
    response.message = `Successfully fetched user with email ${email}`;
    response.data = user;
    response.success = true;
    return response;
  }
}

export default HealthCare;
