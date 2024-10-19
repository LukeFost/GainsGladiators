// This will be where the AI researcher chain will go
// This chain will have an input and an output return.
// The chain will start with a query optimizer
// Then there will be the parrallel instantiation of X workers
// Each worker will have the code tool with a trained format.
// Once the workers get their answer and return it
// A tokenizer checks the size and if it is too big then it is split in half, else
// it is sent back as a response.

//1. Create the basic api outline for lambda and call 

//2. 



import { Resource } from "sst";
import { Handler } from "aws-lambda";

export const handler: Handler = async (_event) => {
  return {
    statusCode: 200,
    body: `${Example.hello()} Linked to ${Resource.MyBucket.name}.`,
  };
};