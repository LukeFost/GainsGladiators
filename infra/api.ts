const openRouterApiKey = new sst.Secret("OpenRouterApiKey");
const exaApiKey = new sst.Secret("EXAAI_API_KEY")
const e2bApiKey = new sst.Secret("E2B_API_KEY")
const thirdwebApiKey = new sst.Secret("THIRDWEB_PUB_API_KEY")

export const researcherAi = new sst.aws.Function("Researcher",{
  handler: "packages/functions/src/researcher.handler",
  url: true,
  link: [openRouterApiKey,exaApiKey, e2bApiKey],
  nodejs: {
    install: ["openai"]
  }
})

export const deployAi = new sst.aws.Function("DeployAi", {
  handler: "packages/functions/src/phala/deploy.handler",
  url: true,
  link: [thirdwebApiKey, e2bApiKey],
})