"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("@grpc/grpc-js");
var fabric_gateway_1 = require("@hyperledger/fabric-gateway");
var crypto = require("crypto");
var fs_1 = require("fs");
var path = require("path");
var util_1 = require("util");
var channelName = envOrDefault("CHANNEL_NAME", "mychannel");
var chaincodeName = envOrDefault("CHAINCODE_NAME", "glshealthcare");
var mspId = envOrDefault("MSP_ID", "Org1MSP");
// Path to crypto materials.
var cryptoPath = process.env.CRYPTO_PATH || "";
// Path to user private key directory.
var keyDirectoryPath = cryptoPath + process.env.KEY_DIRECTORY_PATH;
// Path to user certificate.
var certPath = cryptoPath + process.env.CERT_PATH;
// Path to peer tls certificate.
var tlsCertPath = cryptoPath + process.env.TLS_CERT_PATH;
// Gateway peer endpoint.
var peerEndpoint = envOrDefault("PEER_ENDPOINT", "localhost:7051");
// Gateway peer SSL host name override.
var peerHostAlias = envOrDefault("PEER_HOST_ALIAS", "peer0.org1.example.com");
var utf8Decoder = new util_1.TextDecoder();
var GLSContractGateway = /** @class */ (function () {
    function GLSContractGateway() {
        var _this = this;
        this.client = null;
        this.gateway = null;
        this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var client, gateway, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(!this.client || !this.gateway)) return [3 /*break*/, 4];
                        return [4 /*yield*/, newGrpcConnection()];
                    case 1:
                        client = _c.sent();
                        _a = fabric_gateway_1.connect;
                        _b = {
                            client: client
                        };
                        return [4 /*yield*/, newIdentity()];
                    case 2:
                        _b.identity = _c.sent();
                        return [4 /*yield*/, newSigner()];
                    case 3:
                        gateway = _a.apply(void 0, [(_b.signer = _c.sent(),
                                _b.evaluateOptions = function () {
                                    return { deadline: Date.now() + 5000 }; // 5 seconds
                                },
                                _b.endorseOptions = function () {
                                    return { deadline: Date.now() + 15000 }; // 15 seconds
                                },
                                _b.submitOptions = function () {
                                    return { deadline: Date.now() + 5000 }; // 5 seconds
                                },
                                _b.commitStatusOptions = function () {
                                    return { deadline: Date.now() + 60000 }; // 1 minute
                                },
                                _b)]);
                        this.gateway = gateway;
                        this.client = client;
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.disconnect = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.close();
                (_b = this.gateway) === null || _b === void 0 ? void 0 : _b.close();
                return [2 /*return*/];
            });
        }); };
        this.getContract = function () { return __awaiter(_this, void 0, void 0, function () {
            var network, contract;
            return __generator(this, function (_a) {
                if (!this.gateway) {
                    throw new Error("Gateway is not connected");
                }
                try {
                    network = this.gateway.getNetwork(channelName);
                    contract = network.getContract(chaincodeName);
                    return [2 /*return*/, contract];
                }
                catch (err) {
                    throw new Error("Error getting contract");
                }
                return [2 /*return*/];
            });
        }); };
        this.connect();
    }
    GLSContractGateway.getInstance = function () {
        if (!this.instance) {
            this.instance = new GLSContractGateway();
        }
        return this.instance;
    };
    return GLSContractGateway;
}());
exports.default = GLSContractGateway;
// Utility functions
function newGrpcConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var tlsRootCert, tlsCredentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.promises.readFile(tlsCertPath)];
                case 1:
                    tlsRootCert = _a.sent();
                    tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
                    return [2 /*return*/, new grpc.Client(peerEndpoint, tlsCredentials, {
                            "grpc.ssl_target_name_override": peerHostAlias,
                        })];
            }
        });
    });
}
function newIdentity() {
    return __awaiter(this, void 0, void 0, function () {
        var credentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.promises.readFile(certPath)];
                case 1:
                    credentials = _a.sent();
                    return [2 /*return*/, { mspId: mspId, credentials: credentials }];
            }
        });
    });
}
function newSigner() {
    return __awaiter(this, void 0, void 0, function () {
        var files, keyPath, privateKeyPem, privateKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.promises.readdir(keyDirectoryPath)];
                case 1:
                    files = _a.sent();
                    keyPath = path.resolve(keyDirectoryPath, files[0]);
                    return [4 /*yield*/, fs_1.promises.readFile(keyPath)];
                case 2:
                    privateKeyPem = _a.sent();
                    privateKey = crypto.createPrivateKey(privateKeyPem);
                    return [2 /*return*/, fabric_gateway_1.signers.newPrivateKeySigner(privateKey)];
            }
        });
    });
}
function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}
var glsContractGateway = GLSContractGateway.getInstance();
glsContractGateway.connect();
