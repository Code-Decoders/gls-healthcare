import * as grpc from "@grpc/grpc-js";
import { Contract, Gateway } from "@hyperledger/fabric-gateway";
interface IGLSContractGateway {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getContract: () => Promise<Contract>;
}
export default class GLSContractGateway implements IGLSContractGateway {
    static instance: GLSContractGateway;
    client: grpc.Client | null;
    gateway: Gateway | null;
    static getInstance(): GLSContractGateway;
    private constructor();
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getContract: () => Promise<Contract>;
}
export {};
