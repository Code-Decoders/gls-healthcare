import { envOrDefault } from "../../utils";
import mongoose, { mongo } from "mongoose";
import type { Mongoose } from "mongoose";

interface IMongoDbInit {
  client?: Mongoose;
  connect: () => Promise<void>;
  close: () => Promise<void>;
}

export default class MongoDbInit implements IMongoDbInit {
  client?: Mongoose;
  private uri: string = envOrDefault("DB_URL", "mongodb://localhost:27017");

  static instance: MongoDbInit;

  private constructor() {
    if(!MongoDbInit.instance){
      this.connect()
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDbInit();
    }
    return this.instance;
  }

  async connect() {
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

  async close() {
    if (this.client) {
      await this.client.disconnect();
    }
  }
}
