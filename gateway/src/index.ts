import express, { Express, Request, Response } from "express";
import GLSContractGateway from "./app";
import { TextDecoder } from "util";

const app: Express = express();

const utf8Decoder = new TextDecoder();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("This is the root route no data here");
});

app.use("/get-user", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const email = body.email;
  const type = body.type;

  const glsContractGateway = GLSContractGateway.getInstance();
  await glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  const result = await contract.evaluateTransaction("getUser", email, type);

  const parsedResult = JSON.parse(utf8Decoder.decode(result));

  res.send("Successfully got body" + JSON.stringify(parsedResult));
});

app.use("/register", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const glsContractGateway = GLSContractGateway.getInstance();

  await glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  const result = await contract.submitTransaction("addUser", body);

  res.send("Successfully registered user" + JSON.stringify(result));
});

app.use("/create-appointment", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const appointment = req.body;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("createAppointment", appointment);

  res.send("Successfully created appointment");
});

app.use("/approve-appointment", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const appointmentId = body.appointmentId;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("approveAppointment", appointmentId);

  res.send("Successfully approved appointment");
});

app.use("/reject-appointment", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const appointmentId = body.appointmentId;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("rejectAppointment", appointmentId);

  res.send("Successfully rejected appointment");
});

app.use("/finish-appopintment", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const appointmentId = body.appointmentId;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("finishAppointment", appointmentId);

  res.send("Successfully finished appointment");
});

app.use("/create-report", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const report = req.body;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("createReport", report);

  res.send("Successfully created report");
});

app.use("/get-appointments", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const doctorId = body.doctorId;
  const patientId = body.patientId;
  const receptionistId = body.receptionistId;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  const result = await contract.evaluateTransaction(
    "getAppointments",
    doctorId,
    patientId,
    receptionistId
  );

  const parsedResult = JSON.parse(utf8Decoder.decode(result));

  res.send("Successfully got appointments" + JSON.stringify(parsedResult));
});

app.use("/claim-insurance", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const insurance = req.body;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("claimInsurance", insurance);

  res.send("Successfully claimed insurance");
});

app.use("approve-insurance", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const insuranceId = body.insuranceId;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("approveInsurance", insuranceId);

  res.send("Successfully approved insurance");
});

app.use("reject-insurance", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.send("Invalid request");
  }

  const body = req.body;

  const insuranceId = body.insuranceId;

  const glsContractGateway = GLSContractGateway.getInstance();

  glsContractGateway.connect();

  const contract = await glsContractGateway.getContract();

  contract.submitTransaction("rejectInsurance", insuranceId);

  res.send("Successfully rejected insurance");
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
