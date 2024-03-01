"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const fabric_gateway_1 = require("@hyperledger/fabric-gateway");
const crypto = __importStar(require("crypto"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const util_1 = require("util");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const channelName = envOrDefault("CHANNEL_NAME", "gls-channel");
const chaincodeName = envOrDefault("CHAINCODE_NAME", "gls-health-care");
const mspId = envOrDefault("MSP_ID", "Org2MSP");
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
const utf8Decoder = new util_1.TextDecoder();
class GLSContractGateway {
    static instance;
    client = null;
    gateway = null;
    static getInstance() {
        if (!this.instance) {
            this.instance = new GLSContractGateway();
        }
        return this.instance;
    }
    constructor() {
        this.connect();
    }
    connect = async () => {
        if (!this.client || !this.gateway) {
            const client = await newGrpcConnection();
            const gateway = (0, fabric_gateway_1.connect)({
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
            console.log("Gateway connected", gateway.getIdentity());
            this.client = client;
            console.log("Client connected", client);
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
        }
        catch (err) {
            throw new Error("Error getting contract");
        }
    };
}
exports.default = GLSContractGateway;
// Utility functions
async function newGrpcConnection() {
    const tlsRootCert = await fs_1.promises.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        "grpc.ssl_target_name_override": peerHostAlias,
    });
}
async function newIdentity() {
    const credentials = await fs_1.promises.readFile(certPath);
    return { mspId, credentials };
}
async function newSigner() {
    const files = await fs_1.promises.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs_1.promises.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return fabric_gateway_1.signers.newPrivateKeySigner(privateKey);
}
function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}
console.log(certPath, keyDirectoryPath, tlsCertPath, peerEndpoint, peerHostAlias);
const testFunction = async () => {
    const glsContractGateway = GLSContractGateway.getInstance();
    await glsContractGateway.connect();
    const contract = await glsContractGateway.getContract();
    await contract.submitTransaction("createDummyUsers");
    const patient = await contract.evaluateTransaction("getUser", "patient@mail.com", "patient");
    const result = utf8Decoder.decode(patient);
    console.log(result);
    console.log(contract.getChaincodeName());
};
testFunction();
//# sourceMappingURL=app.js.map