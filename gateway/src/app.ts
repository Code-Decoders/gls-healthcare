import * as grpc from "@grpc/grpc-js";
import {
  connect,
  Contract,
  Identity,
  Signer,
  signers,
  Gateway,
} from "@hyperledger/fabric-gateway";
import * as crypto from "crypto";
import { promises as fs } from "fs";
import * as path from "path";
import { TextDecoder } from "util";
import * as dotenv from "dotenv";
dotenv.config();

const channelName = envOrDefault("CHANNEL_NAME", "mychannel");
const chaincodeName = envOrDefault("CHAINCODE_NAME", "gls-health-care");
const mspId = envOrDefault("MSP_ID", "Org1MSP");

// Path to crypto materials.
const cryptoPath = process.env.CRYPTO_PATH || "";

// Path to user private key directory.
const keyDirectoryPath = cryptoPath + process.env.KEY_DIRECTORY_PATH;

// Path to user certificate.
const certPath = cryptoPath + process.env.CERT_PATH;
// Path to peer tls certificate.
const tlsCertPath = cryptoPath + process.env.TLS_CERT_PATH;

// Gateway peer endpoint.
const peerEndpoint = envOrDefault("PEER_ENDPOINT", "localhost:7051");

// Gateway peer SSL host name override.
const peerHostAlias = envOrDefault("PEER_HOST_ALIAS", "peer0.org1.example.com");

const utf8Decoder = new TextDecoder();

interface IGLSContractGateway {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getContract: () => Promise<Contract>;
}

export default class GLSContractGateway implements IGLSContractGateway {
  static instance: GLSContractGateway;
  client: grpc.Client | null = null;
  gateway: Gateway | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GLSContractGateway();
    }
    return this.instance;
  }

  private constructor() {
    this.connect();
  }

  connect = async () => {
    if (!this.client || !this.gateway) {
      const client = await newGrpcConnection();

      const gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        evaluateOptions: () => {
          return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
          return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
          return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
          return { deadline: Date.now() + 60000 }; // 1 minute
        },
      });
      this.gateway = gateway;
      this.client = client;
    }
  };

  disconnect = async () => {
    this.client?.close();
    this.gateway?.close();
  };

  getContract = async () => {
    if (!this.gateway) {
      throw new Error("Gateway is not connected");
    }

    try {
      const network = this.gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);
      return contract;
    } catch (err) {
      throw new Error("Error getting contract");
    }
  };
}

// Utility functions

async function newGrpcConnection(): Promise<grpc.Client> {
  const tlsRootCert = await fs.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    "grpc.ssl_target_name_override": peerHostAlias,
  });
}

async function newIdentity(): Promise<Identity> {
  const credentials = await fs.readFile(certPath);
  return { mspId, credentials };
}

async function newSigner(): Promise<Signer> {
  const files = await fs.readdir(keyDirectoryPath);
  const keyPath = path.resolve(keyDirectoryPath, files[0]);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

function envOrDefault(key: string, defaultValue: string) {
  return process.env[key] || defaultValue;
}

//Log each global constant properly with name
console.log("channelName: ", channelName);
console.log("chaincodeName: ", chaincodeName);
console.log("mspId: ", mspId);
console.log("cryptoPath: ", cryptoPath);
console.log("keyDirectoryPath: ", keyDirectoryPath);
console.log("certPath: ", certPath);
console.log("tlsCertPath: ", tlsCertPath);
console.log("peerEndpoint: ", peerEndpoint);
console.log("peerHostAlias: ", peerHostAlias);