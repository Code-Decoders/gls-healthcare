import { envOrDefault } from "../../utils";
import mongoose from "mongoose";
import type { Mongoose } from "mongoose";
import lighthouse from "@lighthouse-web3/sdk";
import mime from "mime";

interface IMongoDbInit {
  client?: Mongoose;
  connect: () => Promise<void>;
  close: () => Promise<void>;
}

interface INFTStorageService {
  upload: (file: FileList) => Promise<string | undefined>;
}

export default class MongoDbInit implements IMongoDbInit {
  client?: Mongoose;
  private uri: string = envOrDefault("DB_URL", "mongodb://localhost:27017");

  static instance: MongoDbInit;

  private constructor() {
    if (!MongoDbInit.instance) {
      this.connect();
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDbInit();
      this.instance.connect();
    }
    return this.instance;
  }

  async connect() {
    if (!this.client) {
      try {
        await mongoose.connect(this.uri, {
          maxPoolSize: 10,
          dbName: "GLSHealthCare",
        });

        this.client = mongoose;
        mongoose.connection.on("connected", () => {
          console.log("Connected to MongoDB");
        });

        mongoose.connection.on("disconnected", () => {
          console.log("Disconnected from MongoDB");
        });

        mongoose.connection.on("error", (err) => {
          console.log("Error in connection to MongoDB", err);
        });

        mongoose.connection.on("reconnectFailed", () => {
          console.log("Reconnection to MongoDB failed");
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async close() {
    if (this.client) {
      await this.client.disconnect();
    }
  }
}

const token = envOrDefault(
  "NFT_STORAGE_KEY",
  "ccf9a64c.bdb2988ef3594f4b86d6f0297ae57bb6"
);
export class NFTStorageService implements INFTStorageService {
  private client: any;

  async upload(file: FileList) {
    try {
      const res = await lighthouse.upload(file, token);
      const cid = res.data.Hash
      return cid;
    } catch (err) {
      console.log(err);
    }
  }
}
