import { Contract, Context, Transaction, Returns } from "fabric-contract-api";
import {User} from "../types";
import { Doctor } from "../types/User";

interface Response {
  txID: string;
  success: boolean;
  message: string;
  data: any;
}

class HealthCare extends Contract {

  @Transaction()
  async addUser<T extends User>(
    ctx: Context,
    object: T,
  ): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const dataAsBytes = await ctx.stub.getState(object.email);
    if (dataAsBytes.toString()) {
      response.message = `User with email ${object.email} already exists`;
      return response;
    }

    const doc: T = object;

    await ctx.stub.putState(object.email, Buffer.from(JSON.stringify(doc)));
    await ctx.stub.setEvent("AddUser", Buffer.from(JSON.stringify(doc)));

    response.message = `Successfully added user with email ${object.email}`;
    response.success = true;
    return response;
  }

  @Transaction(false)
  async getUser<T>(ctx: Context, email: string): Promise<Response> {
    const response: Response = {
      txID: ctx.stub.getTxID(),
      success: false,
      message: "",
      data: null,
    };

    const dataAsBytes = await ctx.stub.getState(email);
    if (!dataAsBytes.toString()) {
      response.message = `User with email ${email} not found`;
      return response;
    }

    const doc: User = JSON.parse(dataAsBytes.toString());

    response.message = `Successfully got data ${email}`;
    response.data = doc;
    response.success = true;
    return response;
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
    let results: Doctor[] = [];

    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let doc: Doctor;

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
        response.success = true;
        return response;
      }
    }
  }
}

export default HealthCare;
