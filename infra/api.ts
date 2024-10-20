import { bucket } from "./storage";

export const myApi = new sst.aws.Function("MyApi", {
  url: true,
  link: [bucket],
  handler: "packages/functions/src/api.handler"
});

const openRouterApiKey = new sst.Secret("OpenRouterApiKey");

export const researcherAi = new sst.aws.Function("Researcher",{
  handler: "packages/functions/src/researcher.handler",
  url: true,
  link: [openRouterApiKey],
  nodejs: {
    install: ["openai"]
  }
})