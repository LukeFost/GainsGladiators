import { Resource } from "sst";
import { Handler } from "aws-lambda";

export const handler: Handler = async (_event) => {
  return {
    statusCode: 200,
    body: `${Example.hello()} Linked to ${Resource.MyBucket.name}.`,
  };
};
